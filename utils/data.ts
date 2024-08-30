export const quicksearch = [
  "Sofa",
  "Cadeira gamer",
  "Gaming Chair",
  "Google Pixel",
  "Iphone",
  "Notebook",
  "Mota",
]

interface AvailableItem {
  productName: string
  slug: string
  postedBy: string
  province: string
  photos: string[]
  description: string
  offer: boolean
}

export const availableItems: AvailableItem[] = [
  {
    productName: "Gaming Chair",
    slug: "gaming-chair",
    postedBy: "Jane Smith",
    province: "Nampula",
    photos: [
      "https://techrecomenda.com/wp-content/uploads/2024/06/Design-sem-nome-12.jpg",
      "https://workspace.com.pk/wp-content/uploads/2023/03/gaming-chair-post-07-700x700-1.jpg",
    ],
    description: "Ergonomic gaming chair with adjustable armrests.",
    offer: true,
  },
  {
    productName: 'Air Jordan 13 Retro “Island Green"',
    slug: "air-jordan-13",
    postedBy: "John Doe",
    province: "Nampula",
    photos: [
      "https://superrep.is/wp-content/uploads/2023/10/2931ca32.jpg",
      "https://premiersneakergallery.com/cdn/shop/products/img27_5_c7faf036-23e3-4515-8292-a2e75840aa62_750x.jpg?v=1672788261",
      "https://globalnykicks.com/cdn/shop/products/d1_d1623c86-05f6-4bff-a014-4a00f452b6cd_960x.png?v=1574072928",
    ],
    description: 'Air Jordan 13 Retro “Island Green"',
    offer: true,
  },
  {
    productName: "JoyStick PS5 Dual Sense – Tech 4U",
    slug: "joystick",
    postedBy: "John Doe",
    province: "Nampula",
    photos: [
      "https://tech4u.co.mz/wp-content/uploads/2024/05/Untitled-4-01-1.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/6/AY/LB/CP/22794873/ps5-style-ps-5-4-ps4-wireless-game-pc-ps4-joystick-ps5-controller-500x500.jpg",
      "https://lablaab.com/wp-content/uploads/2021/05/5.5.jpg.f23a0629c6.989x800x800.jpg",
    ],
    description:
      "JoyStick PS5 Dual Sense, aceito troca com um joystick do XBOX 360.",
    offer: false,
  },

  {
    productName: "Sofa",
    slug: "sofa",
    postedBy: "John Doe",
    province: "Nampula",
    photos: [
      "https://m.media-amazon.com/images/I/818ukAwnrKL._AC_UF894,1000_QL80_.jpg",
      "https://www.housingunits.co.uk/media/catalog/product/cache/60968cec045f20fb06ab5f7720001507/a/d/ad3ec91cb8832946abbdc75686b5908b.jpg",
    ],
    description: "Comfortable 3-seater sofa in great condition.",
    offer: false,
  },

  {
    productName: "Google Pixel 2",
    slug: "google-pixel-2",
    postedBy: "Alice Johnson",
    province: "Nampula",
    photos: [
      "https://blogs-images.forbes.com/gordonkelly/files/2017/07/untitled.5236.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNqrhTX2e8IddEe3aQC9Ddj_mrwDcYDkcPxA&s",
    ],
    description: "Google Pixel 2 in excellent condition, includes charger.",
    offer: true,
  },
  {
    productName: "Iphone 13 Pro Max",
    slug: "iphone-13-pro-max",
    postedBy: "Bob Brown",
    province: "Nampula",
    photos: [
      "https://www.coolmatica.pt/store/204932-large_default/smartphone-apple-iphone-13-pro-max-17-cm-67-dual-sim-ios-15-5g-128gb-prateado.jpg",
    ],
    description: "Iphone 13 Pro Max, like new, 256GB storage.",
    offer: false,
  },
  {
    productName: "Notebook",
    slug: "notebook",
    postedBy: "Carol Davis",
    province: "Nampula",
    photos: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFD3BN8thBjqarNFgJzL4DrN0MLdLaxhkPQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAw8e_5RulD2CCXK-48iN-Mp2PaBcHEFweqQ&s",
    ],
    description: "Dell Inspiron notebook, 16GB RAM, 512GB SSD.",
    offer: false,
  },
]
