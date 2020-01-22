// id INT GENERATED ALWAYS AS IDENTITY,
// bio TEXT,
// email VARCHAR(50) NOT NULL,
// username VARCHAR(50) NOT NULL,
// password CHAR(50),
// url_image TEXT,
// name_display VARCHAR(64),
// PRIMARY KEY (id)
const proData = [
  {
  id: 1,
  bio: `Good morning, Mom. Oh, Marty, I almost forgot, Jennifer Parker called. It works, ha ha ha ha, it works. I finally invent something that works. Okay.`,
  email: 'example@example.com',
  username: 'biff',
  password: 'mcfly',
  url_image: 'https://en.wikipedia.org/wiki/File:BiffTannenBackToTheFuture1985.jpg',
  name_display: 'rippedBiff',
  },
  {
  id: 2,
  bio: `Well, Marty, I want to thank you for all your good advise, I'll never forget it. C'mon, Mom, make it fast, I'll miss my bus. Hey see you tonight, Pop. Woo, time to change that oil. That's a great idea. I'd love to park. Doc. What, right here right now in the cafeteria? What is she said no? I don't know if I could take that kind of rejection. Besides, I think she'd rather go with somebody else`,
  email: 'example2@example.com',
  username: 'marty',
  password: 'lorraine',
  url_image: 'https://en.wikipedia.org/wiki/File:Lea_Thompson_February_2015_crop.JPG',
  name_display: 'mr_mcfly',
  },
  {
  id: 3,
  bio: `Hey Biff, check out this guy's life preserver, dork thinks he's gonna drown. Uh, no, no, no, no. What are you looking at, butt-head? Ahh. Well looky what we have here. No no no, you're staying right here with me. I can't play.`,
  email: 'example3@example.com',
  username: 'lorraine',
  password: 'ilovemarty',
  url_image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjHp_bB2pfnAhULTawKHecUA0wQjRx6BAgBEAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMarty_McFly&psig=AOvVaw1r_OTQ1VF6wVZMWfoMjIzK&ust=1579799666959159',
  name_display: 'rainey',
  },
  {
  id: 4,
  bio: `No, Marty, we've already agreed that having information about the future could be extremely dangerous. Even if your intentions are good, they could backfire drastically. Whatever you've got to tell me I'll find out through the natural course of time. He's a very strange young man`,
  email: 'example4@example.com',
  username: 'doc',
  password: 'greatscott',
  url_image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwj0z6fK2pfnAhVKUK0KHZ0ND6gQjRx6BAgBEAQ&url=https%3A%2F%2Fcreative-analytics.corsairs.network%2Fdoc-brown-5d16b2b626f0&psig=AOvVaw218H9Q_lQ92MOSfchnIcLd&ust=1579799685389177',
  name_display: 'doc_brown' ,
  }
]

export default proData;