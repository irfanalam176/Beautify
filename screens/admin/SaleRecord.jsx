import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {url} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
const SaleRecord = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [newSale, setNewSale] = useState({
    type: '',
    itemId: '',
    quantity: '',
  });

    const [action, setAction] = useState(null);
    const actionList = [
      {label: 'Service', value: 'service'},
      {label: 'Product', value: 'product'},
    ];

    const[item,setItem]=useState(null)
    const[itemList,setItemList]=useState([])

    async function handleSale() {
      if (!item || !newSale.itemId || !newSale.quantity) {
        return Alert.alert('Error', 'Please Fill All The Fields');
      }
      try {
        setIsLoading(true);
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newSale),
        };
        const response = await fetch(`${url}/sale/add-sale`, options);
        if (response.ok) {
          Alert.alert('Success', 'sale Added Successfully');
          resetForm();
        }
      } catch (e) {
        Alert.alert('Error', 'Cannot Add sale');
        console.log('Cannot add sale: ' + e);
      } finally {
        setIsLoading(false);
      }
    }

  function resetForm() {
    setNewSale({
      type: '',
      itemId: '',
      quantity: '',
    });
    setItem(null)
    setAction(null)
  }
  const handleInputChange = (field, value) => {
    setNewSale(prev => ({
      ...prev,
      [field]: value,
    }));
  };

    async function executeAction(action){
      setItemsLoading(true)
      try{
        const response = await fetch(`${url}/sale/get-items?q=${action}`,{method:"GET"})
        const result = await response.json()
      if(response.ok){
        setItemList(result)
        
        setItemsLoading(false)
      }
      }catch(e){
        console.log("Cannot get Items" + e);
      }
      
    }


  function goBack() {
    navigation.goBack();
  }
  return (
    <ScrollView contentContainerStyle={style.wrapper}>
      <View style={style.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={style.headerIcon}
          />
        </TouchableOpacity>
        <Text style={style.headerText}>Add Sale</Text>
      </View>

      <View style={style.form}>
        <Text style={style.mainTitle}>Add New Sale</Text>
        <View style={style.inputBox}>
          <TextInput
            placeholder="quanitiy"
            style={style.input}
            placeholderTextColor={'gray'}
            value={newSale.quantity}
            onChangeText={text => handleInputChange('quantity', text)}
          />
        </View>

        <Dropdown
          style={[
            style.input,
            style.inputBox,
          ]}

          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          inputSearchStyle={style.inputSearchStyle}
          iconStyle={style.iconStyle}
          data={actionList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Sale Type"
          searchPlaceholder="Search..."
          value={action}
          onChange={action => {
             setAction(action.value); // set selected value
  handleInputChange('type', action.value); // update form data
  executeAction(action.value); 
          }}
        />
  {itemsLoading&&<ActivityIndicator />}
        <Dropdown
          style={[
            style.input,
            {backgroundColor:itemsLoading?`#ADB2D4`:"#FFB8E0" },
            style.inputBox,
          ]}
          disable={itemsLoading}
          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          inputSearchStyle={style.inputSearchStyle}
          iconStyle={style.iconStyle}
          data={itemList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select product/service"
          searchPlaceholder="Search..."
          value={item}
          onChange={i => {
            setItem(i)
            setNewSale((prev)=>({
              ...prev, itemId:i.value
            }))
          }}
        />
        <View style={[style.flexRow, {gap: 10}]}>
          <Pressable
            style={[
              style.mainBtn,
              style.flexRow,
              {justifyContent: 'center', width: '50%'},
            ]}
            onPress={handleSale}
            disabled={isLoading}>
            <Text style={style.mainBtnTxt}>Add</Text>
            {isLoading ? <ActivityIndicator color={'white'} /> : ''}
          </Pressable>
          <Pressable
            style={[style.mainBtn, {backgroundColor: 'red', width: '50%'}]}
            onPress={() => resetForm()}>
            <Text style={style.mainBtnTxt}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SaleRecord;
