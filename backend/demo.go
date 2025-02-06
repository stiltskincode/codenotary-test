package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int, errors chan<- error, wg *sync.WaitGroup) {
	defer wg.Done()

	for num := range jobs {
		if num%5 == 0 {
			errors <- fmt.Errorf("worker %d: error processing %d", id, num)
			continue
		}

		time.Sleep(time.Millisecond * time.Duration(rand.Intn(500)))
		results <- num * num
		fmt.Printf("Worker %d processed: %d\n", id, num)
	}
}
func main() {
	rand.Seed(time.Now().UnixNano())

	jobs := make(chan int, 10)
	results := make(chan int, 10)
	errors := make(chan error, 5)
	var wg sync.WaitGroup

	numWorkers := 3
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go worker(i, jobs, results, errors, &wg)
	}

}
