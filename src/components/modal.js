import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, Grid } from '@material-ui/core';

const AlertDialog = (props) => {
	const { handleOk, open, handleClose } = props;
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ padding: 25 }}
			>
				<DialogContent>
					<Typography variant="h6">Delete article?</Typography>
				</DialogContent>
				<DialogActions>
					<Grid container spacing={2}>
						<Grid item>
							<Button onClick={handleClose} color="secondary">
								cancel
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={() => {
									handleOk();
									handleClose();
								}}
								color="primary"
								autoFocus
							>
								delete
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AlertDialog;
