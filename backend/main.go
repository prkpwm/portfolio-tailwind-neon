package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func setupRoutes() *mux.Router {
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/verify-super-token", verifySuperToken).Methods("POST")
	api.HandleFunc("/track-location", trackLocation).Methods("POST")
	return r
}

func setupCORS() (handlers.CORSOption, handlers.CORSOption, handlers.CORSOption) {
	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:4200"
	}
	return handlers.AllowedOrigins([]string{corsOrigin}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
}

func main() {
	godotenv.Load()
	loadVisitedIPs()

	r := setupRoutes()
	corsObj, corsHeaders, corsMethods := setupCORS()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(corsObj, corsHeaders, corsMethods)(r)))
}