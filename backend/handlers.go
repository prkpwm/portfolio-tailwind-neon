package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

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

	// Check if IP already tracked
	if isIPTracked(req.IP) {
		response := LocationResponse{
			Success: false,
			Message: "IP already tracked",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		return
	}

	// Track the IP
	trackIP(req.IP)

	// Log the visit
	log.Printf("New visitor: IP=%s, City=%s, Country=%s", req.IP, req.City, req.Country)

	response := LocationResponse{
		Success: true,
		Message: "Location tracked successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}