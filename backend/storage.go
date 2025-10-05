package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"
)

const (
	visitedIPsFile = "visited_ips.json"
	ipExpireDays   = 30
)

var visitedIPs = make(map[string]IPRecord)

func loadVisitedIPs() {
	data, err := ioutil.ReadFile(visitedIPsFile)
	if err != nil {
		log.Printf("No existing visited IPs file found, starting fresh")
		return
	}

	if err := json.Unmarshal(data, &visitedIPs); err != nil {
		log.Printf("Error loading visited IPs: %v", err)
	}

	cleanExpiredIPs()
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

func cleanExpiredIPs() {
	now := time.Now()
	cleaned := 0
	for ip, record := range visitedIPs {
		if now.Sub(record.Timestamp).Hours() >= ipExpireDays*24 {
			delete(visitedIPs, ip)
			cleaned++
		}
	}
	if cleaned > 0 {
		log.Printf("Cleaned %d expired IP records", cleaned)
		saveVisitedIPs()
	}
}

func isIPTracked(ip string) bool {
	record, exists := visitedIPs[ip]
	if !exists {
		return false
	}
	
	if time.Since(record.Timestamp).Hours() >= ipExpireDays*24 {
		delete(visitedIPs, ip)
		return false
	}
	
	return true
}

func trackIP(ip string) {
	visitedIPs[ip] = IPRecord{Timestamp: time.Now()}
	saveVisitedIPs()
}