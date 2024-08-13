package main

import (
	"encoding/json"
	"net/http"
	"os"
	"fmt"
	"strconv"

	"github.com/koujirou513/movie-list-app/db"
	"github.com/koujirou513/movie-list-app/models"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	db.Init()
	defer db.Close()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/movies", getMovies) // 映画リストを取得
	e.GET("/movies/:id", getMovie) // 映画の詳細を表示

	e.POST("/movies/watchlist", addToWatchList)	// 観たい映画リストに追加
	e.DELETE("/movies/watchlist/:id", deleteMovie) // 観たい映画リストから削除

	e.GET("/movies/search", searchMovies) // 映画検索

	e.PUT("/movies/:id/rate", updateMovieRatingAndReview)  // 評価と感想の追加

	e.Logger.Fatal(e.Start(":8080"))
}

// DBから映画情報を取得する関数
func getMovies(c echo.Context) error {
	var movies []models.Movie
	db.DB.Find(&movies)
	return c.JSON(http.StatusOK, movies)
}

// 映画の詳細情報を取得する関数
func getMovie(c echo.Context) error {
	id := c.Param("id")
	var movie models.Movie
	if err := db.DB.First(&movie, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found"})
	}
	return c.JSON(http.StatusOK, movie)
}

// 観たい映画リストに追加する関数
func addToWatchList(c echo.Context) error {
	var movie models.Movie
	if err := c.Bind(&movie); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"message": "Invalid movie data"})
	}

	movie.WatchList = true

	if err := db.DB.Create(&movie).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Could not add movie to watchList"})
	}

	return c.JSON(http.StatusCreated, movie)
}

// 観たい映画リストから削除する関数
func deleteMovie(c echo.Context) error {
	id := c.Param("id")
	var movie models.Movie
	if err := db.DB.First(&movie, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found"})
	}

	db.DB.Delete(&movie)
	return c.NoContent(http.StatusNoContent)
}

// 映画を検索する関数
func searchMovies(c echo.Context) error {
	query := c.QueryParam("q")
	omdbApiKey := os.Getenv("OMDB_API_KEY")
	omdbUrl := fmt.Sprintf("http://www.omdbapi.com/?s=%s&apikey=%s", query, omdbApiKey)

	resp, err := http.Get(omdbUrl)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error fetching movies from OMDb API"})
	}
	defer resp.Body.Close()

	var searchResults map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&searchResults); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error decoding movie data"})
	}

	return c.JSON(http.StatusOK, searchResults)
}

// 映画の評価と感想を追加する関数
func updateMovieRatingAndReview(c echo.Context) error {
	id := c.Param("id")
	var movie models.Movie
	if err := db.DB.First(&movie, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found"})
	}

	ratingStr := c.FormValue("rating")
	review := c.FormValue("review")

	rating, err := strconv.Atoi(ratingStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"message": "Invalid rating value"})
	}

	movie.Rating = int(rating)
	movie.Review = review
	movie.Watched = true

	db.DB.Save(&movie)
	return c.JSON(http.StatusOK, movie)
}