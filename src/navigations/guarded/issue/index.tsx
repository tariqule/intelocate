import {useNavigation} from '@react-navigation/native';
import {Button, Container, Content, Footer, Icon} from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {useSelector} from 'react-redux/lib/hooks/useSelector';
import CategoryCard from '../../../components/categories-card';
import DropDownX from '../../../components/dropdown';
import HeaderX from '../../../components/headerX';
import {_NfcOn} from '../../../components/nfc';
import OfflineMode from '../../../components/offline';
import {Modal_PopUp} from '../../../components/popup';
import {
  ACTIVE_BLUE,
  COLOR_BORDER,
  MAIN_GRAY,
  TEST_BORDER,
  MAIN_GREEN,
} from '../../../config/global-styles';
import {
  offline_category_list,
  offline_external_user_list,
  offline_organizaton_location_list,
  report_issue_fn,
  shouldDispatchOffline,
} from '../../../redux/action/offline';
import {actionStats, totalActionCount} from '../../../redux/action/stats';
import {getCategories} from '../../../services/getCategories';
import {getStats} from '../../../services/getStats';
import {getExternalUsers} from '../../../services/getUser';
import {getUserByNfc} from '../../../services/nfc';
import {
  getListLocationByOrganization,
  getListOrganizationWithLocation,
  getListTenantsWithLocation,
} from '../../../services/organizations';
import FormX from './forms';
import {ChecklistIcon} from '../../../svg-components/checklist-icon';
import {CheckedIcon} from '../../../svg-components/checked-icon';
import {openImagePicker} from '../../../utils/utils';
import {getFileLinks} from './utils';
interface actionModalProps {
  modalVisible: boolean;
  onPressBackButton: () => void;
  headerTitle: string;
  didSubmit?: (boolean) => void;
  nfcLocationId?: string;
  loading?: (boolean) => void;
}
export interface AttachmentData {
  name: string;
  tags: string[];
  description: string;
  data: File;
}
export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  previewFileName: string | null;
  fileLength?: number;
  sender?: {
    fullname: string;
  };
}
const ReportIssue = (props: actionModalProps) => {
  const navigation = useNavigation();

  const offlineCategories = useSelector(
    (state) => state.reportIssue.offlineCategories,
  );
  const offlineSubCategories = useSelector(
    (state) => state.reportIssue.offlineSubCategories,
  );
  const offlineOrganizationList = useSelector(
    (state) => state.reportIssue.offlineOrganizationList,
  );
  const offlineOrganizationLocationList = useSelector(
    (state) => state.reportIssue.offlineOrganizationLocationList,
  );
  const offlineExternalUsersList = useSelector(
    (state) => state.reportIssue.offlineExternalUsersList,
  );

  const offlineOrganizationsPacketData = useSelector(
    (state) => state.reportIssue.offlineOrganizations,
  );

  const isConnected = useSelector((state) => state.network.isConnected);

  const getUserOrgId = useSelector((state) => state.userReducer.organizationId);

  const [organization, setOrganization] = React.useState(
    offlineOrganizationList,
  );
  const [categories, setCategories] = React.useState(
    offlineCategories ? offlineCategories : [],
  );
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const [subCategories, setSubCategories] = React.useState(
    offlineSubCategories ? offlineSubCategories : [],
  );
  const [categoriesIssue, setCategoriesIssue] = React.useState([]);
  const [userLocations, setUserLocations] = React.useState(
    offlineOrganizationLocationList,
  );

  //Form
  const [isFormDone, setIsFormDone] = React.useState<any>();
  const [formTitle, setFormTitle] = React.useState('');
  const [formData, setFormData] = React.useState<any>();
  const [formExist, setFormExist] = React.useState<any>();

  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [externalUsers, setExternalUsers] = React.useState(
    offlineExternalUsersList
      ? offlineExternalUsersList
      : offlineExternalUsersList,
  );
  //Image
  const [imageUri, setImageUri] = React.useState<any>();
  const [imageFileName, setImageFileName] = React.useState<any>();
  const [imageData, setImageData] = React.useState<any>();
  //organization id
  const [useOrganizationID, setUserOrganization] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
  const [selectedLocationId, setSelectedLocationId] = React.useState('');
  const [externalCreatorID, setExternalCreatorId] = React.useState('');
  const [selectedCategoryIssue, setSelectedCategoryIssue] = React.useState('');
  const [submitBtnColor, setSubmitBtnColor] = React.useState(COLOR_BORDER);

  //after submitting
  const [showPopup, setShowPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //nfc
  const [etagLocationId, setEtagLocationId] = React.useState('');

  //form
  const [showForm, setshowForm] = React.useState(false);
  //redux
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(shouldDispatchOffline(true));

    _NfcOn((res) => {
      getUserByNfc(res, (res) => {
        Alert.alert('NFC tag found!', res);
        setEtagLocationId(res.organizationId);
        getListOrganizationWithLocation(
          res.organizationId,
          'CREATE_PROJECT',
          (resOrg) => {
            getListTenantsWithLocation((resTenants) => {
              setOrganization([...resOrg.data, ...resTenants.data]);
            });
          },
        );
      });

      // setNfcId(res);
    });

    // console.log(JSON.stringify(getUserOrgId) + 'offline organaization +');
    console.log(JSON.stringify(userLocations) + '++');

    userLocations &&
      userLocations[0] &&
      setSelectedLocationId(userLocations[0].id);

    if (isConnected) {
      setOrganization(
        offlineOrganizationsPacketData.map((e) => {
          let mapOrg = e._organizations
            .map((v) => {
              return {id: v.id, name: v.name, locations: v._locations};
            })
            .flatMap((e) => e);

          let mapTenant = [{id: e.id, name: e.name, locations: e._locations}];
          return [...mapOrg, ...mapTenant];
        })[0],
      );
      // });
    } else {
      setOrganization(
        offlineOrganizationsPacketData.map((e) => {
          let mapOrg = e._organizations
            .map((v) => {
              return {id: v.id, name: v.name, locations: v._locations};
            })
            .flatMap((e) => e);

          let mapTenant = [{id: e.id, name: e.name, locations: e._locations}];
          return [...mapOrg, ...mapTenant];
        })[0],
      );
    }

    console.log(
      JSON.stringify(
        offlineOrganizationsPacketData.map((e) => {
          let mapOrg = e._organizations
            .map((v) => {
              return {id: v.id, name: v.name, locations: v._locations};
            })
            .flatMap((e) => e);

          let mapTenant = [{id: e.id, name: e.name, locations: e._locations}];
          return [...mapOrg, ...mapTenant];
        })[0],
      ) + '@Here in now',
    );

    getCategories((res) => {
      dispatch(offline_category_list(res.data));
      setCategories(res.data);
    });

    getExternalUsers((res) => {
      dispatch(offline_external_user_list(res.users));
      setExternalUsers(res.users);
    });

    // getListOrganization()
  }, []);

  const Back = (props) => (
    <TouchableOpacity onPress={props.onPressBack}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
        }}>
        <Icon name="arrow-back" style={{color: '#FFF'}} />
        <Text style={{color: '#FFF'}}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  const _onPressCategory = (data, index) => {
    const catIssueSet = (data) => {
      data.number ? setCategoriesIssue(data) : setCategoriesIssue([]);
    };
    console.log(JSON.stringify(data));
    setSelectedCategoryId(data.id);
    setSelectedCategoryName(data.name);

    if (
      data.name === 'Audit' ||
      data.name === 'Merchandising ' ||
      data.name === 'Social Distancing '
    ) {
      setFormExist(true);
      data.name === 'Audit'
        ? setFormTitle('Store Daily Audit ')
        : setIsFormDone(false);
      data.name === 'Merchandising '
        ? setFormTitle('Printer Troubleshooting')
        : setIsFormDone(false);
      data.name === 'Social Distancing '
        ? setFormTitle('Inventory check')
        : setIsFormDone(false);
    } else {
      setFormExist(false);
      setIsFormDone(false);
      setFormTitle('');
    }

    setSubmitBtnColor(ACTIVE_BLUE);

    data._children && setSelectedCategory(data._children);
    setCategoriesIssue([]);
    setSubCategories([]);
    if (
      data.id !== 3887 &&
      data.id !== 2084 &&
      data.id !== 1994 &&
      data.id !== 3778
    ) {
      if (data._children) {
        setSubCategories(data._children);

        setCategoriesIssue([]);
      }
    } else {
      setCategoriesIssue(data._children);
      setSubCategories([]);
    }
  };
  const _onPressSubCategory = (data, index) => {
    console.log(JSON.stringify(data));
    data._children && setCategoriesIssue(data._children);
  };

  const _onChangeCategoryIssue = (val) => {
    setSelectedCategoryIssue(val);
    console.log(val);
  };

  const _onChangeLocation = (id) => {
    setSelectedLocationId(id);
    console.log(id);
    // getListLocationByOrganization(organization.id, (res) =>
    // setUserLocations(res.data),
    // );
  };
  //
  const _onChangeOrganization = (val, data) => {
    console.warn(JSON.stringify(data) + ' ====> pressed data');
    if (isConnected) {
      getListLocationByOrganization(val, (res) => {
        console.log(JSON.stringify(res.data) + 'on press organization');
        // offlineOrganizationList(res.data);
        dispatch(offline_organizaton_location_list(res.data));
        setUserLocations(res.data);
      });
    } else {
      setUserLocations(data.locations);
    }
    console.log(val);
  };
  const _onChangeExternalUsers = (val) => {
    setExternalCreatorId(val);
  };

  const submitIssueResponse = useSelector(
    (state) =>
      state.reportIssue.responseData &&
      state.reportIssue.responseData.map((e) => e.issueNumber),
  );

  const _onPressSubmit = () => {
    if (formExist === true && isFormDone) {
      // const task = {
      //   categoryId: selectedCategoryId,
      //   locationId: props.nfcLocationId || selectedLocationId,
      //   externalCreatorId: externalCreatorID,
      //   name: selectedCategoryIssue || selectedCategoryName,
      //   status: 'NEW',
      //   forms: formData,
      // };

      const task = imageData
        ? {
            categoryId: selectedCategoryId,
            locationId: props.nfcLocationId || selectedLocationId,
            externalCreatorId: externalCreatorID,
            name: selectedCategoryIssue || selectedCategoryName,
            status: 'NEW',
            // files: getFileLinks(1, [imageData.data]),
            forms: formData,
            files: [1],
          }
        : {
            categoryId: selectedCategoryId,
            locationId: props.nfcLocationId || selectedLocationId,
            externalCreatorId: externalCreatorID,
            name: selectedCategoryIssue || selectedCategoryName,
            status: 'NEW',
            forms: formData,
            // files: getFileLinks(1, [imageData.data]),
          };

      // dispatch(
      //   report_issue_fn(useOrganizationID, {
      //     tasks: [JSON.stringify(task)],
      //   }),
      // );

      dispatch(
        report_issue_fn(useOrganizationID, {
          tasks: [task],
          files: imageData,
          // fileName: imageData.fileName,
        }),
      );

      if (!isConnected) {
        Alert.alert('', 'Issue submission is queued!');
      } else {
        //   dispatch(loadingAction(true));
        setLoading(true);
        setTimeout(() => {
          // dispatch(loadingAction(false));
          setLoading(false);
          setShowPopup(true);
          // dispatch(didSubmitAction(true));
        }, 3000);
      }
    }
    if (formExist === true && !isFormDone) {
      alert('Please fill out the form.');
    }

    if (formExist === false) {
      const task = imageData
        ? {
            categoryId: selectedCategoryId,
            locationId: props.nfcLocationId || selectedLocationId,
            externalCreatorId: externalCreatorID,
            name: selectedCategoryIssue || selectedCategoryName,
            status: 'NEW',
            // files: getFileLinks(1, [imageData.data]),

            files: [1],
          }
        : {
            categoryId: selectedCategoryId,
            locationId: props.nfcLocationId || selectedLocationId,
            externalCreatorId: externalCreatorID,
            name: selectedCategoryIssue || selectedCategoryName,
            status: 'NEW',
            // files: getFileLinks(1, [imageData.data]),
          };

      // imageData &&
      dispatch(
        report_issue_fn(useOrganizationID, {
          tasks: [task],
          files: imageData,
          // fileName: imageData.fileName,
        }),
      );
      // !imageData &&
      //   dispatch(
      //     report_issue_fn(useOrganizationID, {
      //       tasks: [JSON.stringify(task)],
      //     }),
      //   );
      if (!isConnected) {
        Alert.alert('', 'Issue submission is queued!');
      } else {
        //   dispatch(loadingAction(true));
        setLoading(true);
        setTimeout(() => {
          // dispatch(loadingAction(false));
          setLoading(false);
          setShowPopup(true);
          // dispatch(didSubmitAction(true));
        }, 3000);
      }
    }
  };

  const ref = React.createRef();
  const _onPressBack = () => {
    getStats((res) => {
      console.log(
        JSON.stringify(res) +
          '===> Action Stats Retrieved. [ISSUE-SCREEN] [USE_EFFECT]',
      );
      let sum = res.data
        .map((o) => o.cnt)
        .reduce((a, c) => {
          return a + c;
        });

      console.log(sum + 'RESULT COUNT');

      // if (isConnected) {
      dispatch(actionStats(res.data));
      dispatch(totalActionCount(sum));
    });
    navigation.goBack();
  };

  const _onPressAttachImage = () => {
    openImagePicker((uri, type, fileName, data, response) => {
      // let image = {
      //   uri: "'file://'" + uri,
      //   name: fileName,
      //   type: type,
      //   data: data,
      // };

      const image = ([
        {
          uri,
          type,
          name: fileName,
        },
      ] as any) as File[];

      console.log(JSON.stringify(image) + 'lol');
      setImageData(image);
      setImageFileName(fileName);
      setImageUri(uri);
    });
  };
  return (
    <Container style={{flex: 1}}>
      <OfflineMode />
      <HeaderX
        title="Log Issue"
        onPress={_onPressBack}
        rightComponent={
          Platform.OS !== 'ios' && (
            <Animatable.View
              animation="rubberBand"
              // duration={1000}
              // easing={'ease-out'}
              iterationCount={10000}>
              <Icon
                name="nfc"
                type="MaterialCommunityIcons"
                style={{color: 'white'}}></Icon>
            </Animatable.View>
          )
        }
      />

      {!loading ? (
        <Content>
          <View
            style={{
              flexDirection: 'column',

              justifyContent: 'center',
            }}>
            <View>
              <Text style={styles.issueTitle}>Organization:</Text>

              <DropDownX
                // value={organization.id}

                data={organization}
                organization={true}
                // defaultValue={Location}
                // disabled={true}
                id={true}
                containerStyle={{
                  borderWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                  borderColor: ACTIVE_BLUE,
                }}
                onChange={(val, data) => _onChangeOrganization(val, data)}
                style={{width: '100%'}}
              />
            </View>
            <View style={{}}>
              <Text style={styles.issueTitle}>Location:</Text>

              <DropDownX
                data={userLocations}
                defaultValue={userLocations}
                id={true}
                organization={true}
                // disabled={true}
                containerStyle={{
                  borderWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                  borderColor: ACTIVE_BLUE,
                }}
                onChange={(val) => _onChangeLocation(val)}
                style={{width: '100%'}}
              />
            </View>

            <Text style={styles.issueTitle}>Issue:</Text>

            <View style={{}}>
              <View>
                <CategoryCard
                  data={categories}
                  onPress={(data, index) => _onPressCategory(data, index)}
                />
              </View>
              <View>
                {subCategories && subCategories.length > 0 && (
                  <CategoryCard
                    subCategories={true}
                    data={subCategories}
                    onPress={(data, index) => _onPressSubCategory(data, index)}
                  />
                )}
              </View>
              <Text style={styles.issueTitle}>Details:</Text>
              <Text style={styles.issueCategorizeTitle}>
                Categorize the issue:
              </Text>
              <Text style={styles.issueCategorizeTitle}>Category Issue:</Text>
              <DropDownX
                data={categoriesIssue}
                // defaultValue={Location}
                // disabled={true}
                containerStyle={{
                  borderWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                  borderColor: ACTIVE_BLUE,
                }}
                onChange={(val) => _onChangeCategoryIssue(val)}
                style={{width: '100%'}}
              />

              <Text style={styles.issueCategorizeTitle}>Submitted By:</Text>
              <DropDownX
                data={externalUsers}
                id={true}
                // defaultValue={Location}
                // disabled={true}
                containerStyle={{
                  borderWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                  borderColor: ACTIVE_BLUE,
                }}
                onChange={(val, index) => _onChangeExternalUsers(val)}
                style={{width: '100%'}}
              />

              {formTitle !== '' && (
                <TouchableOpacity style={{}} onPress={() => setshowForm(true)}>
                  <Text style={styles.issueCategorizeTitle}>
                    Complete form(s) to submit an issue:
                  </Text>
                  <View
                    style={{
                      // borderWidth: 0.5,
                      left: 10,
                      borderColor: MAIN_GRAY,

                      width: '50%',
                      padding: 10,
                      height: 100,
                      alignSelf: 'flex-start',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      alignItems: 'center',
                      elevation: 1,
                    }}>
                    {/* {isFormDone !== false ?():()} */}

                    {isFormDone !== false ? (
                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            height: 40,
                            width: 40,
                            padding: 4,
                            borderRadius: 100,
                            backgroundColor: MAIN_GREEN,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // padding: 12,
                          }}>
                          <View style={{height: 20, width: 20}}>
                            <CheckedIcon color={'white'} />
                          </View>
                        </View>
                        <Text style={{color: MAIN_GRAY}}>
                          {formTitle}
                          {/* Store {selectedCategoryName} */}
                        </Text>
                        <Text style={{color: MAIN_GRAY, fontSize: 10}}>
                          (Submitted)
                        </Text>
                      </View>
                    ) : (
                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            height: 40,
                            width: 40,
                            padding: 4,
                            borderRadius: 100,
                            backgroundColor: COLOR_BORDER,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // padding: 12,
                          }}>
                          <View style={{height: 20, width: 20}}>
                            <ChecklistIcon color={'white'} />
                          </View>
                        </View>
                        <Text style={{color: MAIN_GRAY}}>
                          {/* Store {selectedCategoryName} */}
                          {formTitle}
                        </Text>
                        <Text style={{color: MAIN_GRAY, fontSize: 10}}>
                          (Not Submitted)
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
              <Text style={styles.issueCategorizeTitle}>
                Add Photo or files
              </Text>
              <View style={{padding: 10}}>
                <Button
                  onPress={_onPressAttachImage}
                  style={{
                    alignItems: 'center',
                    backgroundColor: ACTIVE_BLUE,
                    justifyContent: 'center',
                    height: 30,
                    width: '20%',
                  }}>
                  <Text style={{color: 'white'}}> Choose</Text>
                </Button>
                <Text style={{color: MAIN_GRAY, paddingTop: 10}}>
                  {imageFileName}
                </Text>
              </View>
              <Text style={styles.issueCategorizeTitle}>Notes:</Text>
              <Input />

              <FormX
                auditForm={(formData) => setFormData(formData)}
                merchandisingForm={(formData) => setFormData(formData)}
                isFormFilled={(boolean) => setIsFormDone(boolean)}
                isFormComplete={(boolean) => setIsFormDone(boolean)}
                isModalVisible={showForm}
                title={formTitle}
                onBackButtonPress={() => setshowForm(false)}
              />
            </View>
          </View>
        </Content>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Footer style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            paddingRight: 30,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',

              width: 80,
              justifyContent: 'center',
            }}
            onPress={_onPressBack}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <Button
            onPress={_onPressSubmit}
            disabled={selectedCategory && !loading ? false : true}
            style={{
              backgroundColor: loading ? MAIN_GRAY : submitBtnColor,
              width: 80,
              justifyContent: 'center',
            }}>
            {loading ? (
              <Text style={{color: '#FFF'}}>Submitting</Text>
            ) : (
              <Text style={{color: '#FFF'}}>Submit</Text>
            )}
          </Button>
        </View>
      </Footer>
      {showPopup && (
        <Modal_PopUp
          isVisible={showPopup}
          title="Issue Submitted"
          issueNumber={`Issue #${submitIssueResponse}`}
          onPress={() => {
            // _onPressBack();
            setShowPopup(false);
          }}></Modal_PopUp>
      )}
    </Container>
  );
};

export default ReportIssue;

const styles = StyleSheet.create({
  dropDown: {
    borderWidth: 1,
    borderColor: ACTIVE_BLUE,
    borderRadius: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  issueTitle: {
    fontSize: 20,
    left: 2,
    padding: 10,
  },
  issueCategorizeTitle: {
    fontSize: 15,
    // left: 10,
    padding: 10,
    color: MAIN_GRAY,
  },
  col: {
    // justifyContent: 'center',
    alignContent: 'center',
    borderWidth: TEST_BORDER,
    alignItems: 'center',
    height: 80,
  },
  iconCategory: {
    color: MAIN_GRAY,
    fontSize: 20,
  },
  colText: {
    color: MAIN_GRAY,
    // padding: ,
    fontSize: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
