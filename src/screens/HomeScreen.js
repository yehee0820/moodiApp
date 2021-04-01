import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import CalendarStrip from 'react-native-calendar-strip';
// import CheckBox from 'react-native-check-box';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.mainDiary}>
        <View>
          <Image
            style={styles.character}
            source={require('../../assets/images/pokemon.png')}
          />
        </View>
        <View style={styles.charMentContainer}>
          {/* 캐릭터 멘트가 등장하는 부분 */}
          <View style={styles.charMent}>
            <Text style={styles.charText}>
              오늘도 고생 많았어! 보고 싶어서 기다렸는데 얼른 얘기해줘~!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.charButton}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.charButtonText}>기록하러 가기!</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainAnalysis}>
        <Text style={styles.weeklyText}>Weekly mood</Text>
        <CalendarStrip
          style={styles.mainCalendar}
          customDatesStyles={customDatesStylesFunc}
        />
      </View>
      <View style={styles.mainQuest}>
        <Text style={styles.questText}>Daily Mission</Text>
        <Text style={styles.questInfo}>
          오늘의 미션을 수행하면 기분이 한결 나아질 거예요. Just Do it!
        </Text>
        <View style={styles.questBox}>
          <Text style={styles.questBoxText}>
            하루가 가기 전에 고마움 표현하기
          </Text>
          {/* <CheckBox style={styles.questCheck} /> */}
        </View>
        <View style={styles.questBox}>
          <Text style={styles.questBoxText}>
            주말에 뭐 먹을지 행복한 고민하기
          </Text>
          {/* <CheckBox style={styles.questCheck} /> */}
        </View>
        <View style={styles.questBox}>
          <Text style={styles.questBoxText}>오늘 하늘 3번 보기</Text>
          {/* <CheckBox style={styles.questCheck} /> */}
        </View>
      </View>

      <View style={styles.mainPoint}>
        <Image
          style={styles.userLevel}
          source={require('../../assets/images/treestump.png')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const customDatesStylesFunc = date => {
  if (date.isoWeekday() === 5) {
    // Fridays
    return {
      dateNameStyle: {color: 'blue'},
      dateNumberStyle: {color: 'purple'},
      dateContainerStyle: {color: 'yellow'},
    };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDDA',
  },

  //mainDiary(챗봇과의 대화로 연결)
  mainDiary: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  character: {
    marginLeft: -10,
    marginTop: 16,
    width: 140,
    height: 120,
  },
  charMentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  charMent: {
    marginTop: 10,
    width: 230,
    height: 60,
    padding: 10,
    backgroundColor: '#b9dbdc',
    justifyContent: 'center',
    borderRadius: 10,
  },
  charText: {
    textAlign: 'justify',
    fontFamily: 'OdAmumal',
    fontSize: 15,
    color: 'black',
  },
  charButton: {
    backgroundColor: '#ffffff',
    width: 95,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 2,
  },
  charButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'OdAmumal',
  },

  //mainAnalysis(주별 기록 현황 통계로 보여줌)
  mainAnalysis: {
    flex: 1.6,
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  weeklyText: {
    fontFamily: 'Baloo2-ExtraBold',
    fontSize: 20,
  },
  mainCalendar: {
    height: 90,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },

  //mainQuest(데일리 퀘스트 팝업)
  mainQuest: {
    flex: 3,
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  questText: {
    marginTop: 20,
    fontFamily: 'Baloo2-ExtraBold',
    fontSize: 20,
  },
  questInfo: {
    fontFamily: 'OdAmumal',
    marginTop: 3,
    marginBottom: 3,
    fontSize: 15,
    color: 'gray',
  },
  questBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    width: '94%',
    height: '18%',
    borderRadius: 40,
    backgroundColor: '#ffffff',
  },
  questBoxText: {
    padding: 5,
    marginLeft: 15,
    fontFamily: 'OdAmumal',
    fontSize: 15,
    color: 'black',
  },
  questCheck: {
    marginRight: 20,
  },

  //mainPoint(사용자 보상, 레벨 확인)
  mainPoint: {
    paddingHorizontal: 30,
    flex: 2.3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userLevel: {
    marginTop: 50,
    width: '50%',
    height: '80%',
  },
});
