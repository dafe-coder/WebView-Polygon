import { setTimer } from "../store/slices/storageSlice"

export const logTimer = (value, dispatch) => {
	function startDeadline(deadline) {
		dispatch(setTimer(deadline))
	}
	let deadline = new Date()
	switch (value) {
		case '5 minutes':
			startDeadline(deadline.setMinutes(deadline.getMinutes() + 5))
			break
		case '15 minutes':
			startDeadline(deadline.setMinutes(deadline.getMinutes() + 15))
			break
		case '30 minutes':
			startDeadline(deadline.setMinutes(deadline.getMinutes() + 30))
			break
		case '1 hour':
			startDeadline(deadline.setMinutes(deadline.getMinutes() + 60))
			break
		case '6 hours':
			startDeadline(deadline.setMinutes(deadline.getMinutes() + 60 * 6))
			break
		case 'never':
			startDeadline('never')
			break
		default:
			break
	}
}
