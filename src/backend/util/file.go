package util

import (
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
)

func includesLine(lines []string, line string) bool {
	for _, l := range lines {
		if l == line {
			return true
		}
	}
	return false
}

// WriteFile creates path and file with override
func WriteFile(path string, data []byte) error {
	_ = os.MkdirAll(filepath.Dir(path), 0755)
	return ioutil.WriteFile(path, data, 0755)
}

// ReadFile reads content of the file
func ReadFile(path string) ([]byte, error) {
	return ioutil.ReadFile(path)
}

// RemoveFile removes file
func RemoveFile(path string) error {
	return os.Remove(path)
}

// ReadDirFiles returns file names located in the directory
func ReadDirFiles(path string, ext string) ([]string, []int) {
	cmd := exec.Command("sh", "-c", "find "+path+"/*.db -printf '%s/%f\\n'")
	out, _ := cmd.Output()
	names := make([]string, 0)
	sizes := make([]int, 0)
	for _, line := range strings.Split(string(out), "\n") {
		if line != "" {
			chunks := strings.Split(line, "/")
			name := strings.Split(chunks[1], ".")[0]
			size, _ := strconv.Atoi(chunks[0])
			names = append(names, name)
			sizes = append(sizes, size/1024)
		}
	}
	return names, sizes
}

// ReadFileLines return lines in file
func ReadFileLines(path string) []string {
	cmd := exec.Command("cat", path)
	out, _ := cmd.Output()
	list := make([]string, 0)
	for _, line := range strings.Split(string(out), "\n") {
		if line != "" {
			list = append(list, line)
		}
	}
	return list
}

// WriteFileLines writes lines to the file
func WriteFileLines(path string, lines []string) error {
	data := []byte(strings.Join(lines, "\n"))
	return WriteFile(path, data)
}

// AddFileLine appends line to the file
func AddFileLine(path string, line string) error {
	lines := ReadFileLines(path)
	if includesLine(lines, line) {
		return ItemDuplicationError
	}
	return WriteFileLines(path, append(lines, line))
}

// RemoveFileLine removes line from the file
func RemoveFileLines(path string, lines []string) error {
	fileLines := ReadFileLines(path)
	new := []string{}
	for _, l := range fileLines {
		if !includesLine(lines, l) {
			new = append(new, l)
		}
	}
	return WriteFileLines(path, new)
}
