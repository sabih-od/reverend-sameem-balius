const draweritems = [
    { title: 'Home', nav: 'Home', submenu: null },
    { title: 'Mass', nav: 'Mass', submenu: null },
    { title: 'Homily', nav: 'Homily', submenu: null },
    {
        title: 'Lectures', nav: null, submenu: [
            { title: 'Bible Study', nav: 'BibleStudy' },
            { title: 'Social', nav: 'Social' },
            { title: 'Well-Being', nav: 'WellBeing' }
        ],
    },
    {
        title: 'Meditation', nav: null, submenu: [
            { title: 'Spiritual', nav: 'Spiritual' },
            { title: 'Bibical', nav: 'Bibical' },
            { title: 'Hymns', nav: 'Hymns' }
        ]
    },
    {
        title: 'News', nav: 'News', submenu: null
    },
    {
        title: 'Library', nav: null, submenu: [
            { title: 'Books', nav: 'Books' },
            { title: 'CDs', nav: 'CDs' },
            { title: 'Audio', nav: 'Audio' }
        ]
    },
    {
        title: 'Programs', nav: null, submenu: [
            { title: 'Jesus the Human', nav: 'JesustheHuman' },
            { title: 'Verse & Truth', nav: 'VerseTruth' },
            { title: 'Spiritual Eco', nav: 'SpiritualEco' },
            { title: 'Wind of Spirit', nav: 'WindofSpirit' }
        ]
    },
    {
        title: 'Cources', nav: 'Cources', submenu: null
    },
    { title: 'QuestionAnswer', nav: 'QuestionAnswer', submenu: null },
    { title: 'Contact Us', nav: 'Contact', submenu: null },
]

export default draweritems;