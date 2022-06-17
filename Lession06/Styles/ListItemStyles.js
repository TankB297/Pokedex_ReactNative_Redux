import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ListItemStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    headerContainer: {
        marginBottom: screenWidth / 60,
        marginTop: screenWidth / 60,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: screenWidth / 35,
    },
    itemContainer: {
        alignItems: 'center',
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenWidth / 60,
    },
    searchSubContainer: {
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth / 1.1,
        paddingLeft: screenWidth / 40,
        paddingRight: screenWidth / 40,
        borderRadius: 25,
    },
    searchIcon: {
        marginRight: screenWidth / 60,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.6/3,
        marginRight: screenWidth / 35,
    },
    sortContainer: {
        marginLeft: screenWidth / 40,
        marginRight: screenWidth / 40,
        alignItems: 'center'
    },
    sortTitle: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 26,
        lineHeight: 31,
        color: '#17171B',
        marginBottom: screenWidth / 100,
    },
    sortContent: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#747476',
    },
    sortButtonContainer: {
        alignItems: 'center',
        marginTop: screenWidth / 20,
    },
    sortButton: {
        width: screenWidth / 1.2,
        paddingTop: screenWidth / 25,
        paddingBottom: screenWidth / 25,
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: screenWidth / 30,
    },
    sortButtonText: {
        fontSize: 15
    },
    sortTitleContainer: {
        marginBottom: screenWidth / 60,
        width: screenWidth / 1.2,
    },
    filterTitleContainer: {
        marginBottom: screenWidth / 60,
    },
    filterItem: {
        width: screenWidth / 2.2,
        padding: screenWidth / 30,
        alignItems: 'center',
        borderRadius: 15,
        margin: screenWidth / 80,
    },
    filterItemContainer: {
        alignItems: 'center',
    },
    buttonFilterContainer: {
        flexDirection: 'row',
        marginTop: screenWidth / 60,
    },
    buttonFilter: {
        width: screenWidth / 2.5,
        paddingTop: screenWidth / 30,
        paddingBottom: screenWidth / 30,
        alignItems: 'center',
        margin: screenWidth / 50,
        borderRadius: 15
    },
    buttonFilterText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    filterContent: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700'
    }
})
export default ListItemStyles