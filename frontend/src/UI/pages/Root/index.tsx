import { Box, Card, CardMedia, Container, Typography } from '@mui/material'
import React, { ReactElement } from 'react'

const Root: React.FC = (): ReactElement => {
	return (
		<Container>
			<Box sx={{ mt: 3 }}>
				<Typography variant="h2">Home</Typography>
			</Box>
			<Box>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Card>
						<div style={{ position: 'relative' }}>
							<CardMedia
								style={{ width: '100%' }}
								component="img"
								image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
								title="Pancakes"
								alt="Pancakes"
							/>
							<div
								style={{
									position: 'absolute',
									color: 'white',
									bottom: 10,
									left: '50%',
									transform: 'translateX(-50%)',
									width: '100%',
									textAlign: 'center',
								}}
							>
								<Typography sx={{ letterSpacing: 2 }}>
									Welcome bookworm, have a look at our library and leave a book
									review.
								</Typography>
							</div>
						</div>
					</Card>
				</Box>
			</Box>
		</Container>
	)
}

export default Root
