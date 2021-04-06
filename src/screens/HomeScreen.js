import React, {useState} from 'react';
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
import moodiQuest from '../../assets/data/moodiQuest.json';
import CheckBox from '@react-native-community/checkbox';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [Quest, setQuest] = useState({
    quest01: '',
    quest02: '',
    quest03: '',
  });

  const [Checkbox, setCheckbox] = useState({
    checkbox01: false,
    checkbox02: false,
    checkbox03: false,
  });

  const changeCheckbox01 = e => {
    setCheckbox({
      ...Checkbox,
      checkbox01: true,
    });
  };

  const changeCheckbox02 = e => {
    setCheckbox({
      ...Checkbox,
      checkbox02: true,
    });
  };

  const changeCheckbox03 = e => {
    setCheckbox({
      ...Checkbox,
      checkbox03: true,
    });
  };

  const giveQuest = () => {
    //setInterval()로 시간 설정
    //자정 될 때마다 0,1,2 가져옴
    //가져와서 quest1, 2, 3에 저장
    //그 i += 3 처럼 해서 다음 날 다른 거 가져오도록
    //list에 51개가 있다고 할 때 if i == 51 되면 리스트 전체 재시작
    //해외에서 사용하는 경우에도 자정에 뜰 수 있게 시간 맞추기
  };

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
          <Text style={styles.questBoxText}>{moodiQuest[0].mission}</Text>
          <CheckBox
            style={styles.questCheck}
            disabled={false}
            value={Checkbox.checkbox01}
            onValueChange={changeCheckbox01}
          />
        </View>
        <View style={styles.questBox}>
          <Text style={styles.questBoxText}>
            주말에 뭐 먹을지 행복한 고민하기
          </Text>
          <CheckBox
            style={styles.questCheck}
            disabled={false}
            value={Checkbox.checkbox02}
            onValueChange={changeCheckbox02}
          />
        </View>
        <View style={styles.questBox}>
          <Text style={styles.questBoxText}>오늘 하늘 3번 보기</Text>
          <CheckBox
            style={styles.questCheck}
            disabled={false}
            value={Checkbox.checkbox03}
            onValueChange={changeCheckbox03}
          />
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
    marginRight: 25,
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
