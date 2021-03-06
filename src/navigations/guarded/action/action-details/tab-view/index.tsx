import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {useSelector} from 'react-redux';
import AccordianX from '../../../../../components/accordianX';
import ScrollableTabBar from '../../../../../components/tab-bar/index';
import {
  font_xs,
  MAIN_BLUE,
  MAIN_GRAY,
  MAIN_GREEN,
} from '../../../../../config/global-styles';
import {getFilesForIssue, getFormForIssue} from '../../../../../services/issue';
import {CheckedIcon} from '../../../../../svg-components/checked-icon';
import FormX from '../../../issue/forms';
import Actual from '../home/actuals';
import ActionStatus from '../home/action-status';
import Budget from '../home/budgets';
import LocationInfo from '../home/locationInfo';
import ProjectInfo from '../home/project-info';
import CheckList from '../check-list';
import User from '../user';
import Message from '../message';
import Files from '../files';

export const TabView = (props) => {
  const selected = useSelector((state) => state.issueActon.selectedAction);

  //forms
  const [specificTaskForm, setSpecificTaskForm] = React.useState<any>({});
  const [formData, setFormData] = React.useState<any>();
  const [isFormDone, setIsFormDone] = React.useState<boolean>();
  const [showForm, setShowForm] = React.useState<boolean>();
  const [loading, setLoading] = React.useState<boolean>(true);

  //files
  const [filesData, setFilesData] = React.useState<any | []>();

  React.useEffect(() => {
    setLoading(true);
    getFormForIssue(
      selected.id,
      (response) => {
        console.log(JSON.stringify(response) + 'forms retrieved');
        response && setSpecificTaskForm(response.data[0]);
        setLoading(false);
      },
      // setSpecificTaskForm(response)
    );
    getFilesForIssue(selected.id, (response) => {
      //show single file
      //only first file will show
      console.log(JSON.stringify(response) + 'files found');
      setFilesData(response);
    });
  }, []);
  const actionMainData = [
    {title: 'Status:', content: <ActionStatus />},
    {
      title: 'Project Details:',
      content: (
        <ProjectInfo
        // category={props.category}
        // subCategory={props.subCategory}
        />
      ),
    },
    {
      title: 'Location Details:',
      content: <LocationInfo />,
    },
    {title: 'Budget & Estimates:', content: <Budget />},
    {
      title: 'Actuals:',
      content: (
        <Actual
          vendorData={props.vendorData}
          externalUsers={props.externalUsers}
          organizations={props.organizations}
          creatorName={props.creatorName}
          finPeriod={props.finPeriod}
          actualData={props.actualData}
        />
      ),
    },
  ];
  const _onPressFormCheckList = () => {
    setShowForm(true);
  };

  return (
    <ScrollableTabView
      initialPage={0}
      locked={false}
      renderTabBar={() => <ScrollableTabBar />}>
      <ScrollView tabLabel="md-home" style={styles.tabView}>
        <View style={styles.card}>
          <AccordianX data={actionMainData} />
        </View>
      </ScrollView>
      <ScrollView tabLabel="checklist" style={styles.tabView}>
        <CheckList />
      </ScrollView>

      <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
        <Message />
      </ScrollView>
      <ScrollView tabLabel="user" style={styles.tabView}>
        <User />
      </ScrollView>
      <ScrollView tabLabel="ios-attach" style={styles.tabView}>
        <Files />
      </ScrollView>
    </ScrollableTabView>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,

    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  checkListCard: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    width: '50%',
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
