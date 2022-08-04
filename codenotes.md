<!-- <Row>
        { news.feed.length > 0
          ?
            news.feed.map(article => {
              const { title, summary } = article
              // console.log(title)
              return (
                <Card key={title} style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>{summary}</Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                  {/* <Card.Img variant="top" src={banner_image}></Card.Img> */}
                </Card>
              )
            })
          :
          <>
            { newsErr ? <h2>Something went wrong. Please try again later</h2> : <h2>Loading...</h2>}
          </>
        }
      </Row> -->