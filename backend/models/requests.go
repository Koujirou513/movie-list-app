package models

type RatingRequest struct {
	Rating int    `json:"rating"`
	Review string `json:"review"`
}