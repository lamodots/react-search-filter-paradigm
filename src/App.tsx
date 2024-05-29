import { useEffect, useState } from 'react';

import { baseUrl } from './constants/constants';
import { User } from './types/post';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function App() {
	const [error, setError] = useState();
	const [posts, setPosts] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const searchItem = posts?.filter((item: User) =>
		search.toLowerCase() == ''
			? item
			: item.title.toLowerCase().includes(search)
	);
	useEffect(() => {
		async function getData() {
			try {
				setLoading(true);
				const response = await fetch(`${baseUrl}/posts`);
				const data: User = await response.json();
				setPosts(data);
				setLoading(false);
			} catch (error) {
				console.log(error);

				setLoading(false);
			}
		}

		getData();
	}, []);

	if (loading) {
		return (
			<h1 style={{ textAlign: 'center', marginTop: 240 }}>Loading ....</h1>
		);
	}
	return (
		<>
			<Stack>
				<Container fluid='md' className='mt-4 mb-4'>
					<Row>
						<Col>
							<Form>
								<Form.Control
									type='text'
									placeholder='Search post'
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Form>
						</Col>
					</Row>
				</Container>
				<Container fluid='md' className='mt-4 mb-4'>
					<Row>
						{searchItem?.map((post: User) => {
							return (
								<Col key={post.id}>
									<Card style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Title>{post?.title}</Card.Title>
											<Card.Text>{post?.body}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
			</Stack>
		</>
	);
}

export default App;
