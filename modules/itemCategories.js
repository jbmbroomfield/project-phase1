export const itemCategories = {
  films: {
    heading: 'Films',
    nameField: 'title',
    fields: [
      'director',
      'producer',
      'release_date',
      'opening_crawl',
      'characters',
      'planets',
      'species',
      'starships',
      'vehicles'
    ]
  },
  people: {
    heading: 'Characters',
    nameField: 'name',
    fields: [
      'films',
      'birth_year',
      'gender',
      'eye_color',
      'hair_color',
      'skin_color',
      'starships',
      'vehicles',
    ]
  },
  planets: {
    heading: 'Planets',
    nameField: 'name',
    fields: [
      'films',
      'residents',
      'climate',
      'population',
      'terrain',
      'gravity',
    ]
  },
  species: {
    heading: 'Species',
    nameField: 'name',
    fields: [
      'designation',
      'classification',
      'average_height',
      'language',
      'eye_colors',
      'hair_colors',
      'skin_colors',
      'people',
      'films',
    ]
  },
  starships: {
    heading: 'Ships',
    nameField: 'name',
    fields: [
      'manufacturer',
      'starship_class',
      'model',
      'hyperdrive_rating',
      'passengers',
      'films',
    ]
  },
  vehicles: {
    heading: 'Vehicles',
    nameField: 'name',
    fields: [
      'manufacturer',
      'vehicle_class',
      'model',
      'crew',
      'passengers',
      'films',
    ]
  },
}
