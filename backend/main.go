package main

import (
	"encoding/json"
	"net/http"
	"os"
	"fmt"

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

	e.PUT("/movies/watchlist/:id", updateWatchList)	// 観たい映画リストに追加
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
	// データベースから映画を検索
	if err := db.DB.First(&movie, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found in the database"})
	}
	return c.JSON(http.StatusOK, movie)
}

// 観たい映画リストに追加する関数
func updateWatchList(c echo.Context) error {
	id := c.Param("id") // URLパラメータから映画IDを取得
	var movie models.Movie

	if err := db.DB.Where("id = ?", id).First(&movie).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found in the database"})
	}
	// 映画が存在する場合、watchListをtrueにする
	movie.WatchList = true
	if err := db.DB.Save(&movie).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Failed to update movie"})
	}
	return c.JSON(http.StatusOK, movie)
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

// 映画を検索する関数（タイトルは必須、上映年はオプション）
func searchMovies(c echo.Context) error {
	title := c.QueryParam("title")
	year := c.QueryParam("year")

	if title == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{"message": "Title is required"})
	}

	// 重複チェック
	var existingMovie models.Movie
	if err := db.DB.Where("title = ? AND year = ? ", title, year).First(&existingMovie).Error; err == nil {
		// すでに存在する場合はその映画情報を返す
		return c.JSON(http.StatusOK, existingMovie)
	}

	omdbApiKey := os.Getenv("OMDB_API_KEY")
	omdbUrl := fmt.Sprintf("http://www.omdbapi.com/?t=%s&y=%s&apikey=%s", title, year, omdbApiKey)

	resp, err := http.Get(omdbUrl)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error fetching movies from OMDb API"})
	}
	defer resp.Body.Close()

	var movie models.Movie
	if err := json.NewDecoder(resp.Body).Decode(&movie); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error decoding movie details"})
	}
	
	// 映画情報をデータベースに保存
	if err := db.DB.Create(&movie).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Could not save movie data"})
	}

	return c.JSON(http.StatusOK, movie)
}


// 映画の評価と感想を追加する関数
func updateMovieRatingAndReview(c echo.Context) error {
	id := c.Param("id")
	var movie models.Movie
	if err := db.DB.First(&movie, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"message": "Movie not found"})
	}
	// リクエストを構造体にバインド
	var req models.RatingRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"message": "Invalid request body"})
	}

	if req.Rating < 1 || req.Rating > 5 {
		return c.JSON(http.StatusBadRequest, echo.Map{"message": "Invalid request value"})
	}

	movie.Rating = req.Rating
	movie.Review = req.Review
	movie.Watched = true

	db.DB.Save(&movie)
	return c.JSON(http.StatusOK, movie)
}