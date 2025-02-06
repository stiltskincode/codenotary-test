package main

import (
	"stiltskincode/codenotary-test/backend/cmd/service/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
	}))

	r.GET("/hello", handlers.GetHelloWorldHandler())

	r.Run(":" + "9000")
}
