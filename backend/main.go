package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

type TokenRequest struct {
	Token string `json:"token"`
}

type TokenResponse struct {
	Valid bool `json:"valid"`
}

type LocationRequest struct {
	IP       string `json:"ip"`
	City     string `json:"city"`
	Country  string `json:"country"`
	Lat      float64 `json:"lat"`
	Lng      float64 `json:"lng"`
	Hostname string `json:"hostname"`
	Org      string `json:"org"`
	Region   string `json:"region"`
	Timezone string `json:"timezone"`
}

type LocationResponse struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

var visitedIPs = make(map[string]bool)
const visitedIPsFile = "visited_ips.json"



func verifySuperToken(w http.ResponseWriter, r *http.Request) {
	var req TokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	superToken := os.Getenv("SUPER_TOKEN")
	if superToken == "" {
		superToken = "SUPER2024" // fallback
	}

	response := TokenResponse{
		Valid: req.Token == superToken,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func trackLocation(w http.ResponseWriter, r *http.Request) {
	var req LocationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Check if IP already visited
	if visitedIPs[req.IP] {
		response := LocationResponse{
			Success: false,
			Message: "IP already tracked",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		return
	}

	// Mark IP as visited
	visitedIPs[req.IP] = true
	saveVisitedIPs()

	// Log the visit
	log.Printf("New visitor: IP=%s, City=%s, Country=%s", req.IP, req.City, req.Country)

	response := LocationResponse{
		Success: true,
		Message: "Location tracked successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func loadVisitedIPs() {
	data, err := ioutil.ReadFile(visitedIPsFile)
	if err != nil {
		log.Printf("No existing visited IPs file found, starting fresh")
		return
	}

	if err := json.Unmarshal(data, &visitedIPs); err != nil {
		log.Printf("Error loading visited IPs: %v", err)
	}
	log.Printf("Loaded %d visited IPs from file", len(visitedIPs))
}

func saveVisitedIPs() {
	data, err := json.Marshal(visitedIPs)
	if err != nil {
		log.Printf("Error marshaling visited IPs: %v", err)
		return
	}

	if err := ioutil.WriteFile(visitedIPsFile, data, 0644); err != nil {
		log.Printf("Error saving visited IPs: %v", err)
	}
}

func main() {
	godotenv.Load()
	loadVisitedIPs()
	
	r := mux.NewRouter()
	
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/verify-super-token", verifySuperToken).Methods("POST")
	api.HandleFunc("/track-location", trackLocation).Methods("POST")

	// CORS
	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:4200" // fallback
	}
	corsObj := handlers.AllowedOrigins([]string{corsOrigin})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback
	}

	log.Printf("Server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(corsObj, corsHeaders, corsMethods)(r)))
}