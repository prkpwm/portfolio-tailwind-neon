package main

import "time"

type TokenRequest struct {
	Token string `json:"token"`
}

type TokenResponse struct {
	Valid bool `json:"valid"`
}

type LocationRequest struct {
	IP       string  `json:"ip"`
	City     string  `json:"city"`
	Country  string  `json:"country"`
	Lat      float64 `json:"lat"`
	Lng      float64 `json:"lng"`
	Hostname string  `json:"hostname"`
	Org      string  `json:"org"`
	Region   string  `json:"region"`
	Timezone string  `json:"timezone"`
}

type LocationResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type IPRecord struct {
	Timestamp time.Time `json:"timestamp"`
}