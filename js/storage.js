var storage = {
  getStorage: function() {
    var savedPlans = localStorage.savedPlans;
    if (savedPlans === undefined || savedPlans === "") {
      return [];
    }
    savedPlans = JSON.parse(savedPlans);
    for (i in savedPlans) {
      savedPlans[i] = new Plan(savedPlans[i]);
    }
    return savedPlans;
  },

  setStorage: function(plans) {
    for (i in plans) {
      plans[i] = plans[i].toJSON();
    }
    localStorage.savedPlans = JSON.stringify(plans);
  },

  savePlanToStorage: function(plan) {
    var savedPlans = this.getStorage(),
        saved = false;

    for (i in savedPlans) {
      if (savedPlans[i].equals(plan)) {
        savedPlans[i] = plan;
        saved = true;
      }
    }
    if (saved === false) {
      savedPlans.push(plan);
    }
    this.setStorage(savedPlans);
  },

  savePlanStatusToStorage: function(plan, status) {
    var savedPlans = this.getStorage();

    for (i in savedPlans) {
      if (savedPlans[i].key === plan.key 
        && savedPlans[i].name === plan.name 
        && savedPlans[i].href === plan.href) {
        for (key in status) {
          savedPlans[i][key] = status[key];
        }
        this.setStorage(savedPlans);
        return;
      }
    }
  },

  deletePlanFromStorage: function(plan) {
    var savedPlans = this.getStorage(),
        newSavedPlans = [];
    for (i in savedPlans) {
      if (savedPlans[i].key === plan.key 
        && savedPlans[i].name === plan.name 
        && savedPlans[i].href === plan.href) {
        continue;
      }
      newSavedPlans.push(savedPlans[i]);
    }
    this.setStorage(newSavedPlans);
  },

  findPlanInStorage: function(plan) {
    var savedPlans = this.getStorage();
    for (i in savedPlans) {
      if (savedPlans[i].key === plan.key 
        && savedPlans[i].name === plan.name 
        && (savedPlans[i].href === plan.href
        || savedPlans[i].href === plan.link.href)) {
        return true;
      }
    }
    return false;
  }  
}
