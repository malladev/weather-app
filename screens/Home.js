import { View, SafeAreaView, TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline'
import { debounce } from 'lodash'
import { fetchLocationsData, fetchWeatherData } from '../api/weather'
import { weatherImages } from '../constants'
import {Dimensions} from 'react-native';


const Home = () => {

    const [showSearch, setShowSearch] = useState(false)
    const [locations, setLocations] = useState([])
    const [weather, setWeather] = useState({})
    const { windowHeight, windowWidth } = Dimensions.get('window');

    const handleLocation = (loc) => {
        setLocations([])
        setShowSearch(false)
        fetchWeatherData({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data)
        })
        
    }

    const handleSearch = (value) => {
        if (value.length > 2) {
            fetchLocationsData({ cityName: value }).then(data => {
                setLocations(data)
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

    const {current, location} = weather; 


    return (
        <View className="flex-1 relative">
            <StatusBar style='light' />
            <Image blurRadius={70} source={require('../assets/images/bg.png')} className="absolute h-full w-full" />
            <SafeAreaView className="flex flex-1">
                {/* Search section */}
                <View style={{ height: '7%' }} className="mx-[4%] relative z-50">
                    <View className="flex-row justify-end items-center rounded-full" style={{ backgroundColor: showSearch ? theme.backgreoundWhite(0.2) : 'transparent' }}>
                        {
                            showSearch ? (
                                <TextInput
                                    onChangeText={handleTextDebounce}
                                    className="px-[3%] pl-[6%] pb-[1%]  flex-1 text-base text-white"
                                    placeholder='Recherche'
                                    placeholderTextColor={'lightgray'}
                                />
                            ) : null
                        }
                        <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={{ backgroundColor: theme.backgreoundWhite(0.3) }} className="rounded-full p-[3%] m-[1%]">
                            <MagnifyingGlassIcon size={25} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length > 0 && showSearch ? (
                            <View className="absolute top-[16%] rounded-lg w-full min-h-full overflow-auto bg-gray-300 ">
                                {locations.map((loc, index) => {
                                    return (
                                        <TouchableOpacity onPress={handleLocation(loc)} key={index} className="flex-row items-center border-0 p-3 px-4 mb-1 gap-2">
                                            <MapPinIcon size={16} color={'gray'} />
                                            <Text className="text-base text-black font-semibold">London</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        ) : null
                    }
                </View>

                {/* New section */}

                <View className="mx-[3%] flex justify-around  flex-1 mb-[2%]">
                    {/* Location */}
                    <Text className="text-white text-center text-2xl font-bold">
                        {location?.name}
                        <Text className="text-lg font-semibold text-gray-300">
                            {" " + location?.country}
                        </Text>
                    </Text>

                    {/* Weather Image */}
                    <View className="flex-row justify-center">
                        <Image source={weatherImages?.current?.condition?.text} className="w-52 h-52" />
                    </View>

                    {/* Degre section */}
                    <View className="space-y-2">
                        <Text className="text-center text-white font-bold text-6xl ml-5">
                            {current?.temp_c}&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            {current?.condition?.text}
                        </Text>
                    </View>

                    {/* Other statictique */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
                            <Text className="text-white font-semibold text-base">
                                22km
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
                            <Text className="text-white font-semibold text-base">
                                44%
                            </Text>
                        </View><View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
                            <Text className="text-white font-semibold text-base">
                                6:05AM
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Next day */}
                <View className="mb-2 space-y-3">
                    <View className="flex-row items-center mx-5 space-x-2">
                        <CalendarDaysIcon size={22} color={'white'} />
                        <Text className="text-white text-base">Daily Day</Text>
                    </View>
                    <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>
                        <View className="gap-4 flex flex-row">
                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-3"
                                style={{ backgroundColor: theme.backgreoundWhite(0.15) }}>
                                <Image source={require('../assets/images/heavyrain.png')}
                                    className="w-11 h-11" />
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">
                                    13&#176;
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-3"
                                style={{ backgroundColor: theme.backgreoundWhite(0.15) }}>
                                <Image source={require('../assets/images/heavyrain.png')}
                                    className="w-11 h-11" />
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">
                                    13&#176;
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-3"
                                style={{ backgroundColor: theme.backgreoundWhite(0.15) }}>
                                <Image source={require('../assets/images/heavyrain.png')}
                                    className="w-11 h-11" />
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">
                                    13&#176;
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-3"
                                style={{ backgroundColor: theme.backgreoundWhite(0.15) }}>
                                <Image source={require('../assets/images/heavyrain.png')}
                                    className="w-11 h-11" />
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">
                                    13&#176;
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-3"
                                style={{ backgroundColor: theme.backgreoundWhite(0.15) }}>
                                <Image source={require('../assets/images/heavyrain.png')}
                                    className="w-11 h-11" />
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">
                                    13&#176;
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Home