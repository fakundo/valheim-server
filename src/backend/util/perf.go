package util

import (
	"math"
	"os/exec"
	"strconv"
	"strings"
)

// PerfData contains information about cpu and memory usage
type PerfData struct {
	CPU int32
	MEM int32
}

// Update performance information
func (p *PerfData) Update(pid int) {
	cmd := exec.Command("top", "-p", strconv.Itoa(pid), "-b", "-n", "2", "-d", "0.2")
	out, err := cmd.Output()
	if err == nil {
		chunks := strings.Fields(string(out))
		cpuRaw := chunks[len(chunks)-4]
		memRaw := chunks[len(chunks)-7]
		cpu, _ := strconv.ParseFloat(cpuRaw, 32)
		mem, _ := strconv.ParseFloat(strings.Replace(memRaw, "g", "", 1), 32)
		p.CPU = int32(math.Round(cpu))
		p.MEM = int32(math.Round(mem * 1024 * 1024))
	}
}

// Reset performance information
func (p *PerfData) Reset() {
	p.CPU = 0
	p.MEM = 0
}
