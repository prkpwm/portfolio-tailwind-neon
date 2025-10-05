#!/bin/bash
cd frontend && ng build --configuration production && cd .. && firebase deploy --only hosting