const draweritems = [
    { title: 'Home', nav: 'Home', children: null },
    { title: 'Mass', nav: 'Mass', children: null },
    { title: 'Homily', nav: 'Homily', children: null },
    {
        title: 'Lectures', nav: null, children: [
            { title: 'Bible Study', nav: 'BibleStudy' },
            { title: 'Social', nav: 'Social' },
            { title: 'Well-Being', nav: 'WellBeing' }
        ],
    },
    {
        title: 'Meditation', nav: null, children: [
            { title: 'Spiritual', nav: 'Spiritual' },
            { title: 'Bibical', nav: 'Bibical' },
            { title: 'Hymns', nav: 'Hymns' }
        ]
    },
    {
        title: 'News', nav: 'News', children: null
    },
    {
        title: 'Library', nav: null, children: [
            { title: 'Books', nav: 'Books' },
            { title: 'CDs', nav: 'CDs' },
            { title: 'Audio', nav: 'Audio' }
        ]
    },
    {
        title: 'Programs', nav: null, children: [
            { title: 'Jesus the Human', nav: 'JesustheHuman' },
            { title: 'Verse & Truth', nav: 'VerseTruth' },
            { title: 'Spiritual Eco', nav: 'SpiritualEco' },
            { title: 'Wind of Spirit', nav: 'WindofSpirit' }
        ]
    },
    {
        title: 'Cources', nav: 'Cources', children: null
    },
    { title: 'QuestionAnswer', nav: 'QuestionAnswer', children: null },
    { title: 'Contact Us', nav: 'Contact', children: null },
]

export default draweritems;