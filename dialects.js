const dialects = [
  {
    "id": "dongbei",
    "name": "东北官话",
    "en": "NORTHERN FIELDS",
    "title": "黑土与雪晶",
    "places": "哈尔滨 · 长春 · 沈阳",
    "colors": [
      {
        "name": "黑土黑",
        "hex": "#26231F",
        "rgb": [
          38,
          35,
          31
        ]
      },
      {
        "name": "冰雪白",
        "hex": "#F1F4F2",
        "rgb": [
          241,
          244,
          242
        ]
      },
      {
        "name": "麦穗黄绿",
        "hex": "#B2B953",
        "rgb": [
          178,
          185,
          83
        ]
      }
    ],
    "elements": "黑土 / 冰雪 / 麦穗",
    "description": "以六角雪晶与农田的疏密秩序，织出北方土地的肌理。",
    "motif": "雪晶放射",
    "feature": "多数点无独立入声；儿化、轻声因地点而异。"
  },
  {
    "id": "beijing",
    "name": "北京官话",
    "en": "COURTYARD ECHOES",
    "title": "宫墙与院落",
    "places": "北京 · 承德",
    "colors": [
      {
        "name": "宫墙红",
        "hex": "#A23930",
        "rgb": [
          162,
          57,
          48
        ]
      },
      {
        "name": "琉璃金",
        "hex": "#C79F4B",
        "rgb": [
          199,
          159,
          75
        ]
      },
      {
        "name": "胡同灰",
        "hex": "#7B7E7A",
        "rgb": [
          123,
          126,
          122
        ]
      }
    ],
    "elements": "四合院 / 胡同 / 京绣",
    "description": "以北京城为视觉样点，提取院落格局与宫墙的层层围合。",
    "motif": "院落回环",
    "feature": "以北京点为例，儿化与轻声较突出，不等同于普通话。"
  },
  {
    "id": "jilu",
    "name": "冀鲁官话",
    "en": "WOVEN PLAINS",
    "title": "土布与平原",
    "places": "济南 · 保定",
    "colors": [
      {
        "name": "平原土黄",
        "hex": "#BA9754",
        "rgb": [
          186,
          151,
          84
        ]
      },
      {
        "name": "土布靛蓝",
        "hex": "#334B6E",
        "rgb": [
          51,
          75,
          110
        ]
      },
      {
        "name": "棉布米白",
        "hex": "#E8E0CF",
        "rgb": [
          232,
          224,
          207
        ]
      }
    ],
    "elements": "华北平原 / 农田 / 土布",
    "description": "把威县土布的经纬关系转译为流动的粒子织网。",
    "motif": "经纬交织",
    "feature": "古清入多归阴平，次浊入多归去声；存在过渡与例外。"
  },
  {
    "id": "jiaoliao",
    "name": "胶辽官话",
    "en": "TIDAL CONTOURS",
    "title": "海湾与潮线",
    "places": "烟台 · 青岛 · 大连",
    "colors": [
      {
        "name": "海湾蓝",
        "hex": "#326A91",
        "rgb": [
          50,
          106,
          145
        ]
      },
      {
        "name": "礁石灰",
        "hex": "#737F82",
        "rgb": [
          115,
          127,
          130
        ]
      },
      {
        "name": "沙滩浅金",
        "hex": "#D7BE89",
        "rgb": [
          215,
          190,
          137
        ]
      }
    ],
    "elements": "半岛 / 港湾 / 礁石",
    "description": "以两半岛海岸为取样意象，让潮线在深色水面上相叠。",
    "motif": "潮汐曲线",
    "feature": "典型清入字多归上声；调类名称不直接代表升降。"
  },
  {
    "id": "zhongyuan",
    "name": "中原官话",
    "en": "EARTH STRATA",
    "title": "黄土与田垄",
    "places": "郑州 · 西安 · 徐州",
    "colors": [
      {
        "name": "黄土赭",
        "hex": "#B17D45",
        "rgb": [
          177,
          125,
          69
        ]
      },
      {
        "name": "陶土褐",
        "hex": "#774C35",
        "rgb": [
          119,
          76,
          53
        ]
      },
      {
        "name": "黍麦金",
        "hex": "#CDAA52",
        "rgb": [
          205,
          170,
          82
        ]
      }
    ],
    "elements": "黄河 / 台塬 / 汴绣",
    "description": "以黄土台塬、田垄和河流折线构成层层展开的地貌。",
    "motif": "田垄层带",
    "feature": "典型清入、次浊入多归阴平；区域内部差异显著。"
  },
  {
    "id": "lanyin",
    "name": "兰银官话",
    "en": "DUNES & OASES",
    "title": "沙丘与绿洲",
    "places": "兰州 · 银川",
    "colors": [
      {
        "name": "砂岩黄",
        "hex": "#C9A465",
        "rgb": [
          201,
          164,
          101
        ]
      },
      {
        "name": "黄河褐",
        "hex": "#906D42",
        "rgb": [
          144,
          109,
          66
        ]
      },
      {
        "name": "绿洲青绿",
        "hex": "#437567",
        "rgb": [
          67,
          117,
          103
        ]
      }
    ],
    "elements": "河西走廊 / 黄河 / 绿洲",
    "description": "沙丘的层线与河道分汊缓缓迁移，在砂色中留下绿洲。",
    "motif": "沙丘行波",
    "feature": "典型清入、次浊入多归去声；具体调值因地点而异。"
  },
  {
    "id": "jianghuai",
    "name": "江淮官话",
    "en": "RIVERS IN BROCADE",
    "title": "水网与云锦",
    "places": "南京 · 扬州 · 合肥",
    "colors": [
      {
        "name": "江水青",
        "hex": "#639194",
        "rgb": [
          99,
          145,
          148
        ]
      },
      {
        "name": "云锦金",
        "hex": "#C09C50",
        "rgb": [
          192,
          156,
          80
        ]
      },
      {
        "name": "粉墙白",
        "hex": "#ECE9DE",
        "rgb": [
          236,
          233,
          222
        ]
      }
    ],
    "elements": "江淮水网 / 运河 / 云锦",
    "description": "以南京云锦的层次与水网的流向，编织轻盈的云带。",
    "motif": "云锦水纹",
    "feature": "多数地区保留独立入声；喉塞尾及音节时长需逐点确认。"
  },
  {
    "id": "xinan",
    "name": "西南官话",
    "en": "BAMBOO RESONANCE",
    "title": "竹影与山岚",
    "places": "成都 · 重庆 · 贵阳 · 昆明",
    "colors": [
      {
        "name": "竹林墨绿",
        "hex": "#2A4D41",
        "rgb": [
          42,
          77,
          65
        ]
      },
      {
        "name": "水雾青灰",
        "hex": "#99B0AA",
        "rgb": [
          153,
          176,
          170
        ]
      },
      {
        "name": "朱砂红",
        "hex": "#B54331",
        "rgb": [
          181,
          67,
          49
        ]
      }
    ],
    "elements": "竹林 / 山地 / 江流 / 蜀锦",
    "description": "以川渝竹林和成都蜀锦为视觉锚点，竖线随真实声音起伏。",
    "motif": "竹影竖线",
    "feature": "许多点古入声归阳平；语速由具体语料决定。"
  },
  {
    "id": "jin",
    "name": "晋语",
    "en": "ARCHES OF LOESS",
    "title": "窑洞与木构",
    "places": "太原 · 平遥",
    "colors": [
      {
        "name": "黄土黄",
        "hex": "#BE9751",
        "rgb": [
          190,
          151,
          81
        ]
      },
      {
        "name": "木雕棕灰",
        "hex": "#796B58",
        "rgb": [
          121,
          107,
          88
        ]
      },
      {
        "name": "墨松绿",
        "hex": "#304A3A",
        "rgb": [
          48,
          74,
          58
        ]
      }
    ],
    "elements": "台塬 / 窑洞 / 木构",
    "description": "从窑洞拱形与木构格网提取重复的弧面与结构节点。",
    "motif": "窑洞拱阵",
    "feature": "保留入声是重要线索；连读变调与词缀须逐点考察。"
  },
  {
    "id": "wu",
    "name": "吴语",
    "en": "SILKEN WATER",
    "title": "水乡与丝绢",
    "places": "苏州 · 上海 · 温州",
    "colors": [
      {
        "name": "水乡浅青",
        "hex": "#8FB8B0",
        "rgb": [
          143,
          184,
          176
        ]
      },
      {
        "name": "丝绢白",
        "hex": "#EFEBDC",
        "rgb": [
          239,
          235,
          220
        ]
      },
      {
        "name": "墨黛",
        "hex": "#394045",
        "rgb": [
          57,
          64,
          69
        ]
      }
    ],
    "elements": "江南水网 / 园林 / 苏绣",
    "description": "以苏州与太湖一带为视觉样点，让细密丝线化作连绵柔波。",
    "motif": "丝绢柔波",
    "feature": "入声与连读变调常见；南北吴语差异明显。"
  },
  {
    "id": "min",
    "name": "闽语",
    "en": "ROOFLINES & TIDES",
    "title": "红砖与燕尾",
    "places": "厦门 · 福州 · 潮州",
    "colors": [
      {
        "name": "红砖红",
        "hex": "#AE4B36",
        "rgb": [
          174,
          75,
          54
        ]
      },
      {
        "name": "海潮蓝",
        "hex": "#396F88",
        "rgb": [
          57,
          111,
          136
        ]
      },
      {
        "name": "白石灰",
        "hex": "#DFDCCC",
        "rgb": [
          223,
          220,
          204
        ]
      }
    ],
    "elements": "红砖厝 / 燕尾脊 / 海岸",
    "description": "以闽南红砖与燕尾脊为视觉子样，闽中音频保留原标签。",
    "motif": "燕尾双弧",
    "feature": "各片差异很大，不能以闽南话概括全闽语。"
  },
  {
    "id": "hakka",
    "name": "客家话",
    "en": "ENCLOSED MEMORIES",
    "title": "围屋与天井",
    "places": "梅县 · 长汀",
    "colors": [
      {
        "name": "靛染蓝",
        "hex": "#2F4865",
        "rgb": [
          47,
          72,
          101
        ]
      },
      {
        "name": "夯土黄",
        "hex": "#B18E5E",
        "rgb": [
          177,
          142,
          94
        ]
      },
      {
        "name": "米纸白",
        "hex": "#E9E0CB",
        "rgb": [
          233,
          224,
          203
        ]
      }
    ],
    "elements": "梅州围屋 / 天井 / 土墙",
    "description": "以梅州围屋的中轴、围合与天井形成层层收拢的记忆空间。",
    "motif": "围屋同心",
    "feature": "不少点保留入声；浊音清化后送气是常见线索。"
  },
  {
    "id": "yue",
    "name": "粤语",
    "en": "ARCADES BY THE RIVER",
    "title": "骑楼与榕影",
    "places": "广州 · 香港 · 梧州",
    "colors": [
      {
        "name": "骑楼灰白",
        "hex": "#E0DBCC",
        "rgb": [
          224,
          219,
          204
        ]
      },
      {
        "name": "榕叶绿",
        "hex": "#37684C",
        "rgb": [
          55,
          104,
          76
        ]
      },
      {
        "name": "木棉红",
        "hex": "#C03F36",
        "rgb": [
          192,
          63,
          54
        ]
      }
    ],
    "elements": "骑楼 / 珠江 / 榕树 / 广绣",
    "description": "以广州骑楼和榕叶为视觉锚点，廊柱与弧顶在声中相连。",
    "motif": "骑楼拱廊",
    "feature": "以广州话为例保留鼻音尾与塞音尾；六调、九声口径有别。"
  },
  {
    "id": "xiang",
    "name": "湘语",
    "en": "THREADS OF THE XIANG",
    "title": "湘江与绣线",
    "places": "长沙 · 双峰",
    "colors": [
      {
        "name": "湘江青",
        "hex": "#447877",
        "rgb": [
          68,
          120,
          119
        ]
      },
      {
        "name": "绣线朱红",
        "hex": "#AA3D3E",
        "rgb": [
          170,
          61,
          62
        ]
      },
      {
        "name": "竹色浅金",
        "hex": "#C0A66A",
        "rgb": [
          192,
          166,
          106
        ]
      }
    ],
    "elements": "湘江 / 竹材 / 湘绣",
    "description": "借湘绣的掺针与丝线叠层，在江水青里保留细微交错。",
    "motif": "绣线叠流",
    "feature": "新湘、老湘差异显著；发声态与声母对立须逐点比较。"
  },
  {
    "id": "gan",
    "name": "赣语",
    "en": "LAKE FIBRES",
    "title": "湖水与夏布",
    "places": "南昌 · 临川",
    "colors": [
      {
        "name": "湖水青绿",
        "hex": "#4D8587",
        "rgb": [
          77,
          133,
          135
        ]
      },
      {
        "name": "夏布原麻",
        "hex": "#C1AC85",
        "rgb": [
          193,
          172,
          133
        ]
      },
      {
        "name": "瓦石深灰",
        "hex": "#4F5758",
        "rgb": [
          79,
          87,
          88
        ]
      }
    ],
    "elements": "鄱阳湖 / 水田 / 夏布",
    "description": "以湖面与新余夏布的纤维为材料意象，构成呼吸般的经纬。",
    "motif": "湖面纤维",
    "feature": "多地保留入声；送气、韵尾与调类因地点而异。"
  },
  {
    "id": "hui",
    "name": "徽语",
    "en": "CARVED COURTYARDS",
    "title": "粉墙与三雕",
    "places": "歙县 · 绩溪 · 休宁 · 婺源",
    "colors": [
      {
        "name": "粉墙白",
        "hex": "#ECE7DA",
        "rgb": [
          236,
          231,
          218
        ]
      },
      {
        "name": "黛瓦黑",
        "hex": "#2D3132",
        "rgb": [
          45,
          49,
          50
        ]
      },
      {
        "name": "木雕棕",
        "hex": "#7F5B42",
        "rgb": [
          127,
          91,
          66
        ]
      }
    ],
    "elements": "马头墙 / 天井 / 徽州三雕",
    "description": "把徽州粉墙、马头墙与三雕的镂空层次转为粒子建筑。",
    "motif": "马头墙层构",
    "feature": "内部差异显著；若干点有喉塞或紧喉等特征。"
  },
  {
    "id": "pinghua",
    "name": "平话土话",
    "en": "VALLEY CROSSINGS",
    "title": "河谷与石山",
    "places": "桂南 · 桂北 · 湘南 · 粤北",
    "colors": [
      {
        "name": "喀斯特灰",
        "hex": "#8D9790",
        "rgb": [
          141,
          151,
          144
        ]
      },
      {
        "name": "河谷绿",
        "hex": "#436E5A",
        "rgb": [
          67,
          110,
          90
        ]
      },
      {
        "name": "土墙赭",
        "hex": "#A87F57",
        "rgb": [
          168,
          127,
          87
        ]
      }
    ],
    "elements": "喀斯特 / 河谷 / 村落",
    "description": "以山地河谷的等高线作为视觉入口，保留各地点的独立性。",
    "motif": "河谷等高线",
    "feature": "这是包含多种地方话的汇总项，不是同质的单一音系。"
  }
];
if(typeof module!=="undefined")module.exports=dialects;
