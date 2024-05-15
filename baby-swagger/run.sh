#!/bin/bash

echo "Running backend..."
dotnet run --project  Frontend/Frontend.csproj &

echo "Running API..."
dotnet run --project Api/Api.csproj &

echo "Running frontend..."
cd Frontend/ClientApp
npm run dev &

