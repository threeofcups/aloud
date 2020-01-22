/*
id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url_recording TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  published setting,
  speech_to_text TEXT,
  PRIMARY KEY (id)
  */

const recData = [
  {
    id: 1,
    id_user: 1,
    title: 'jammin',
    description: 'Vastness is bearable only through love two ghostly white figures in coveralls and helmets are soflty dancing something',
    url_recording: 'https://www.epidemicsound.com/track/qQwBjFKxdn',
    created_at: '2020-01-21 11:50:36.310508',
    published: true,
    speech_to_text: 'Vastness is bearable only through love two ghostly white figures in coveralls and helmets are soflty dancing something',
  },
  {
    id: 2,
    id_user: 2,
    title: 'singin',
    description: 'Tendrils of gossamer clouds a still more glorious dawn awaits a mote of dust suspended in a sunbeam rich in heavy atoms a billion trillion cosmic ocean',
    url_recording: 'https://www.epidemicsound.com/track/CVGgQ7PEV7',
    created_at: '2020-01-21 11:51:36.310508',
    published: true,
    speech_to_text: 'Tendrils of gossamer clouds a still more glorious dawn awaits a mote of dust suspended in a sunbeam rich in heavy atoms a billion trillion cosmic ocean',
  },
  {
    id: 3,
    id_user: 3,
    title: 'talkin',
    description: 'Sea of Tranquility courage of our questions galaxies white dwarf encyclopaedia galactica emerged into consciousness.',
    url_recording: 'https://www.epidemicsound.com/track/S03xNi2zfK',
    created_at: '2020-01-21 11:52:36.310508',
    published: true,
    speech_to_text: 'Sea of Tranquility courage of our questions galaxies white dwarf encyclopaedia galactica emerged into consciousness.',
  },
  {
    id: 4,
    id_user: 4,
    title: 'cryin',
    description: 'Dream of the mind\'s eye network of wormholes globular star cluster dispassionate extraterrestrial observer the carbon in our apple pies bits of moving fluff',
    url_recording: 'https://www.epidemicsound.com/track/gZp2yXNUEA',
    created_at: '2020-01-21 11:53:36.310508',
    published: false,
    speech_to_text: 'Dream of the mind\'s eye network of wormholes globular star cluster dispassionate extraterrestrial observer the carbon in our apple pies bits of moving fluff',
  }
]

export default recData;