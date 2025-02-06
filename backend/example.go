package main

var a int = 5 // 0 (domyślna wartość)
var b string  // ""
var c bool    // false
var d float64 // 0.0

func main() {
	e := 42      // Krótsza forma inicjalizacji
	f := "Hello" // Typ określony automatycznie

	_ = e
	_ = f
}
