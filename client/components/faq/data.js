const data = [
  {
    question: 'What information do you collect?',
    answer:
      "**From public torrent websites** we collect the torrent name, upload user, upload date, listed seed and leech count,category, magnetURI, hash, file size, and the files url on the website.\n\n**From trackers** we create a one-way cryptographic hash of users sharing a resource. This is used to prevent duplicate counting of users and is publicy provided to all connecting torrent users, we do not attempt not track individual users or identify them in any way. \n\n**From our website's users** we only collect email, or assosciated login info, with passwords also cryptographically hashed before being stored in our database.",
  },
  {
    question: 'Why collect this information on torrents?',
    answer:
      'BitTorrent has been estimated to be responsible for 3.35% of all web bandwidth ([Palo Alto Networks](http://researchcenter.paloaltonetworks.com/app-usage-risk-report-visualization/#sthash.QjWZnSdp.dpbs)). That is more than all other forms of file sharing online. With so much public file sharing occuring, we decided to begin centralizing an overview of what is being shared most frequently.',
  },
  {
    question: 'Do you host any torrents or their files?',
    answer:
      'No. We only list the information that find from other sources. We never download or upload any of the actual content of the torrents.',
  },
  {
    question: 'Is this illegal?',
    answer:
      'No. Since we do **not** possess or share any of the listed files with users, do **not** distrubite or link to it, we believe nothing here is illegal. This is no different than Google indexing websites.',
  },
];
// {
//   question: '',
//   answer: '',
// },

export default data;
