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
    Awards      string `json:"awards,omitempty"`
    Poster      string `json:"poster"`
    Metascore   string `json:"metascore,omitempty"`
    ImdbRating  string `json:"imdbRating,omitempty"`
    ImdbVotes   string `json:"imdbVotes,omitempty"`
    ImdbID      string `json:"imdbID" gorm:"uniqueIndex"` // ユニーク制約
    Type        string `json:"type,omitempty"`
    DVD         string `json:"dvd,omitempty"`
    BoxOffice   string `json:"boxOffice,omitempty"`
    Production  string `json:"production"`
    Website     string `json:"website,omitempty"`
    WatchList   bool   `json:"watchList"`
	Watched     bool   `json:"watched"`
	Rating      int    `json:"rating"` // 1~5の星評価
	Review      string `json:"review"` // 視聴後の感想
}

