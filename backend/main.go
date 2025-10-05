package main

import (
	"encoding/json"
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

func main() {
	godotenv.Load()
	
	r := mux.NewRouter()
	
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/verify-super-token", verifySuperToken).Methods("POST")

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