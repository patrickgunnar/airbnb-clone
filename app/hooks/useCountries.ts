import countries from "world-countries";


// get countries value, label, flag, latitude and longitude and region
const formattedCountries = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

// use countries hook
const useCountries = () => {
    // get all countries
    const getAll = () => formattedCountries
    // get country by value
    const getByValue = (value: string) => formattedCountries.find(item => item.value === value)

    // return get all and get by value
    return {
        getAll, getByValue
    }
}

export default useCountries
