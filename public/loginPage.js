"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
   ApiConnector.login(data, (response) => {
     if (response.success) {
       location.reload();
     }
     else {
       userForm.setLoginErrorMessage(response.error);
     }
   });
 };

 userForm.registerFormCallback = (data) => {
   ApiConnector.register(data, (response) => {
     if (response.success) {
       location.reload();
     }
     else {
       userForm.setRegisterErrorMessage(response.error);
     }
   });
 };

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney (data,(response) => {
    if(response.success){
      ProfileWidget.showProfile(response.data)
    }
    const message = response.error === undefined ? "Счет успешно пополнен" : response.error;
    moneyManager.setMessage(response.success, message);
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data,(response) =>{
    if(response.success){
      ProfileWidget.showProfile(response.data)
    }
    const message = response.error === undefined ? "Конвертирование успешно выполнено" : response.error;
    moneyManager.setMessage(response.success, message);
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data,(response) => {
    if(response.success){
      ProfileWidget.showProfile(response.data)
    }
    const message = response.error === undefined ? "Перевод успешно выполнен" : response.error;
    moneyManager.setMessage(response.success, message);
  })
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
   if (response.success) {
     favoritesWidget.clearTable();
     favoritesWidget.fillTable(response.data);
     moneyManager.updateUsersList(response.data);
   }
 });

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    }

    const message = response.error === undefined ? "Пользователь успешно добавлен" : response.error;
    favoritesWidget.setMessage(response.success, message);
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    const message = response.error === undefined ? "Пользователь успешно удален" : response.error;
    favoritesWidget.setMessage(response.success, message);
  });
};


