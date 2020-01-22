/*id INT GENERATED ALWAYS AS IDENTITY,
  id_user_creator INT references users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL,
  count_recordings INT NOT NULL,
  url_image TEXT,
  PRIMARY KEY (id)*/
const collData = [
  {
    id: 1,
    id_user_creator: 1,
    title: 'The Jams',
    description: 'Permanence of the stars Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur astonishment birth inconspicuous motes of rock and gas globular star cluster.',
    created_at: '2020-01-21 11:51:36.310508',
    count_recordings: 8,
    url_image: 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
  },
  {
    id: 2,
    id_user_creator: 2,
    title: 'The Joints',
    description: 'Great turbulent clouds made in the interiors of collapsing stars qui dolorem ipsum quia dolor sit amet shores of the cosmic ocean hydrogen atoms take root and flourish.',
    created_at: '2020-01-21 11:52:36.310508',
    count_recordings: 12,
    url_image: 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
  },
  {
    id: 3,
    id_user_creator: 3,
    title: 'The Bops',
    description: 'Stirred by starlight Orion\'s sword gathered by gravity from which we spring the only home weve ever known a mote of dust suspended in a sunbeam?',
    created_at: '2020-01-21 11:53:36.310508',
    count_recordings: 20,
    url_image: 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
  },
  {
    id: 4,
    id_user_creator: 4,
    title: 'The Breaks',
    description: 'Prime number shores of the cosmic ocean encyclopaedia galactica take root and flourish ship of the imagination Rig Veda. ',
    created_at: '2020-01-21 11:54:36.310508',
    count_recordings: 15,
    url_image: 'https://res.cloudinary.com/dahfjsacf/image/upload/v1579656042/qc35njypmtfvjt9baaxq.jpg',
  },
]

export default collData;