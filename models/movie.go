package models

import (
	"github.com/jinzhu/gorm"
)

type Movie struct {
	gorm.Model
	Title       string `json:"title"`
    Year        string `json:"year"`
    Rated       string `json:"rated"`
    Released    string `json:"released"`
    Runtime     string `json:"runtime"`
    Genre       string `json:"genre"`
    Director    string `json:"director"`
    Writer      string `json:"writer"`
    Actors      string `json:"actors"`
    Plot        string `json:"plot"`
    Language    string `json:"language"`
    Country     string `json:"country"`
    Awards      string `json:"awards"`
    Poster      string `json:"poster"`
    Metascore   string `json:"metascore"`
    ImdbRating  string `json:"imdbRating"`
    ImdbVotes   string `json:"imdbVotes"`
    ImdbID      string `json:"imdbID"`
    Type        string `json:"type"`
    DVD         string `json:"dvd"`
    BoxOffice   string `json:"boxOffice"`
    Production  string `json:"production"`
    Website     string `json:"website"`
	WatchList   bool   `json:"watchList"`
	Watched     bool   `json:"watched"`
	Rating      int    `json:"rating,omitempty"` // 1~5の星評価
	Review      string `json:"review,omitempty"` // 視聴後の感想
}

