pass 1:  simplified parser: <find comments> + <find strings> + <find regexp> + <find functions (build nesting?)>
	This finds all 'real' functions ie not in comments etc
pass 1b: <mark functions for parallel parsing>
pass 2:  correct parser + ast generator: <full parse w/o marked functions> + <N webworkers parsing market functions>