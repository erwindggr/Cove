import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Card({ title, text, target, linkTitle, href, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
  linkTitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  rel: PropTypes.string,
  onClick: PropTypes.func,
  linkClassName: PropTypes.string,
};

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        const json = await response.json();
        const newData = json.map(({ id, title, link_title: linkTitle, link, body }) => ({
          id,
          title: title.en,
          linkTitle,
          href: link,
          text: `${body?.en?.substr(0, 50) || ''}...`,
        }));
        setCards(newData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    console.log(url);
  }

  return (
    <div>
      {cards.map(({ id, title, linkTitle, href, text }) => (
        <Card
          key={id}
          title={title}
          linkTitle={linkTitle}
          href={href}
          text={text}
          linkClassName={id === 1 ? 'card__link--red' : ''}
          target={id === 1 ? '_blank' : ''}
          onClick={() => analyticsTrackClick(href)}
        />
      ))}
    </div>
  );
}
