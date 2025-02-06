package main

import (
	// "stiltskincode/codenotary-test/cmd/service/handlers"

	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
	}))

	// r.GET("/hello", handlers.GetHelloWorldHandler())

	type UploadedFile struct {
		FileName string `json:"fileName"`
		Metadata string `json:"metadata"`
	}

	r.GET("files", func(c *gin.Context) {
		entries, err := os.ReadDir("./uploads")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot read files"})
			return
		}

		var fileList []UploadedFile
		for _, d := range entries {
			if d.IsDir() {
				imageDirPath := filepath.Join("uploads", d.Name())
				files, err := os.ReadDir(imageDirPath)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot read file"})
					return
				}

				imageName := ""
				for _, d := range files {
					if d.Name() != "metadata.txt" {
						imageName = d.Name()
						break
					}
				}

				metadataPath := filepath.Join("uploads", d.Name(), "metadata.txt")
				metadatBytes, err := os.ReadFile(metadataPath)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot read file"})
					return
				}

				var uploadedFile UploadedFile
				uploadedFile.FileName = imageName
				uploadedFile.Metadata = string(metadatBytes)

				fileList = append(fileList, uploadedFile)
			}
		}

		c.JSON(http.StatusOK, fileList)
	})

	r.POST("/upload", func(c *gin.Context) {
		file, err := c.FormFile("image")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file"})
			return
		}

		metadata := c.PostForm("metadata")
		guid := uuid.New().String()
		dirPath := filepath.Join("uploads", guid)

		if err := os.MkdirAll(dirPath, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create directory"})
			return
		}

		imagePath := filepath.Join(dirPath, file.Filename)
		metadataPath := filepath.Join(dirPath, "metadata.txt")

		if err := c.SaveUploadedFile(file, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save file"})
			return
		}

		if err := os.WriteFile(metadataPath, []byte(metadata), 0644); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save metadata"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "File uploaded successfully",
		})

	})

	r.Run(":" + "9000")
}
