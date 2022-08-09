import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const CoinNews = ({ symbol }) => {
  // ! state
  const [news, setNews] = useState(null);
  const [newsErr, setNewsErr] = useState(false);

  // https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:xrp&time_from=20220410T0130&limit=55&apikey=7FVRLQDMZWW3RN11

  // ! Execution
  useEffect(() => {
    const getNews = async () => {
      try {
        // console.log('News Id ->', symbol)
        const { data } = await axios.get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:${symbol}&time_from=20220410T0130&limit=55&apikey=7FVRLQDMZWW3RN11`
        );
        setNews(data);
      } catch (err) {
        console.log(err);
        setNewsErr(true);
      }
    };
    getNews();
  }, [symbol]);

  // for (let i = 0; i < news.feed.length; i++) {
  //   console.log(news.feed[i])
  // }

  console.log(news);

  // ! JSX
  return (
    <Container>
      {/* <h1>NEWS API SYMBOL ->, { symbol }</h1> */}
      {/* <br /> */}
      <Row>
        {news ? (
          news.feed.map((article, i) => {
            const { title, source, summary } = article;
            return (
              <>
                <Card key={i} style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {source}
                    </Card.Subtitle>
                    <Card.Text>{summary}</Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>

                {/* <div className="article">
                    <div className="body"></div>
                    <div className="article-img"></div>
                  </div> */}
              </>
            );
          })
        ) : (
          <>
            {newsErr ? (
              <h2>Something went wrong. Please try again later</h2>
            ) : (
              <h2>okay</h2>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default CoinNews;
