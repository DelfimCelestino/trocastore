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
