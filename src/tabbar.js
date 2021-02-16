import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import {friend, selectedFriend, group, selectedGroup, message, selectedMessage, my, selectedMy} from './resources/fonts/iconSvg';
import Friend from './pages/friend/home';
import Group from './pages/group/home';
import Message from './pages/message/home';
import My from './pages/my/home';

export default class tabbar extends Component {
    state ={
        pages: [
            {
                selected: "friend",
                title: "friend",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={friend} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedFriend} />,
                onPress: () => this.setState({ selectedTab: 'friend' }),
                Component: <Friend />
            },
            {
                selected: "group",
                title: "group",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={group} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedGroup} />,
                onPress: () => this.setState({ selectedTab: 'group' }),
                Component: <Group />
            },
            {
                selected: "message",
                title: "message",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={message} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMessage} />,
                onPress: () => this.setState({ selectedTab: 'message' }),
                Component: <Message />
            },
            {
                selected: "my",
                title: "my",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={my} />,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMy} />,
                onPress: () => this.setState({ selectedTab: 'my' }),
                Component: <My />
            },
        ],
        selectedTab: "friend"
    }
    render() {
        const {selectedTab, pages} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <TabNavigator>
                    {pages.map((v, i) => <TabNavigator.Item key={i}
                    selected={selectedTab === v.selected}
                    title={v.title}
                    renderIcon={v.renderIcon}
                    renderSelectedIcon={v.renderSelectedIcon}
                    onPress={v.onPress}
                    tabStyle={{
                        backgroundColor:"#eee",
                        justifyContent:"center"
                    }}
                    >
                        {v.Component}
                    </TabNavigator.Item>)}
                </TabNavigator>
            </View>
        )
    }
}
