```powershell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 YaBrowser/26.8.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("PHPSESSID", "t7ij7plav8fvrke6h09ffs979o", "/", "10.10.12.100")))
Invoke-WebRequest -UseBasicParsing -Uri "http://10.10.12.100/getdata.php?Form=GenRegistry/reg_full&baseForm=GenRegistry/reg_full&theme=bars&cache=c6a89837435ba514a3f71c03c4d8629cc&cache_enabled=0&session_cache=1&FormCache=eabc41e6296efb40a81b73dc89ae30e1&pathForm=%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5%20%D0%BC%D0%B5%D0%BD%D1%8E%20-%3E%20%D0%A0%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="*/*"
  "Accept-Encoding"="gzip, deflate"
  "Accept-Language"="ru,en;q=0.9"
  "Authorization"="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImI0elphb0lqVlZEQXRrWFRXcWhvMHJSd0g3blRwQjFUQll0QVNONmxqMncifQ.eyJhdWQiOiJtaXMtYXBwIiwiYXpwIjoibWlzLWFwcCIsImlhdCI6MTc4OTEwMTMzOS43NzEzNTgsImlzcyI6Imh0dHA6Ly9hdXRoLm1pc25wLnJhZGMubXp0dmVyLnJ1L2F1dGgvcmVhbG1zL2F1dGgiLCJleHAiOjE3ODkxMDg1MzkuNzcxMzU4LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJCTUkzIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOltdfX0sInN1YiI6IjEwMjQ0Nzg2MzYyIiwid29ya2luZ19jb250ZXh0Ijp7Im9yZ2FuaXphdGlvbiI6IjgyNzkwNDYxIiwiZW1wbG95ZWUiOiIxMDI0NDc3NDgxMSIsInJvb20iOiI3Mjk2NDk0NzMifSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWlzIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUifQ.lbf-jXWV6rwvurA8oQcvKsJTI51vrr4Ke-r1ZPjbdyId9sRlDRWRzCr32Yq40JKBVJUAb8CfhXSzoqagiI1LEmTKRZjSHjbIIc8Coslk9kPE3Ka7BNssJstF21QEbDbfHyUCWP65lwPMSWvdBQy7xbSblXYVOBkjZpZOWcHXALJuG1nemsnJs4cJSR_9R_byWqyclnq6BQYMdqwKBLajFiZX6FYltENzEgy-JFi960_R1fBjo-TQvsgFc24S0fnBalFVhYPR1apZFRLC33Zur_nIxsyMkt2zBFZJnfDisOg9hrwKWrYBELi1bBcVGBHNo8rB37o-fWFf9qB9BzWy-Q"
  "Method"="POST getdata.php?Form=GenRegistry/reg_full&baseForm=GenRegistry/reg_full&theme=bars&cache=c6a89837435ba514a3f71c03c4d8629cc&cache_enabled=0&session_cache=1&FormCache=eabc41e6296efb40a81b73dc89ae30e1&pathForm=%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B5%20%D0%BC%D0%B5%D0%BD%D1%8E%20-%3E%20%D0%A0%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5 HTTP/1.1"
  "Origin"="http://10.10.12.100"
  "Referer"="http://10.10.12.100/"
  "X-KL-kfa-Ajax-Request"="Ajax_Request"
} `
-ContentType "application/x-www-form-urlencoded; charset=UTF-8" `
-Body "&DataSet=PATIENTS&mode=Range&HIV_FILTER_g0=1&CARD_NUMB_g6=18%2F030584&COLUMN_SET_g9=11111111111111&FULL_POLIS_g11=0&WITHOUT_POLIS_g13=0&ADDR_TYPE_g15=1&_srt[FULLNAME]=1&_c=10&_s=1&_pageNum=0"
```

```python
import xmltodict

xml_data = '''<?xml version="1.0" encoding="UTF-8" ?><DataSet name="PATIENTS">
                    <row>
                    <ID>91377758</ID>
                    <PMC_ID>91377763</PMC_ID>
                    <FULLNAME>Егоров Виталий Валентинович</FULLNAME>
                    <BIRTHDATE>31.05.1957</BIRTHDATE>
                    </row></DataSet>'''

data = xmltodict.parse(xml_data)

# Доступ к данным через ключи
rows = data['DataSet']['row']
print(rows['FULLNAME'])  # Егоров Виталий Валентинович
```


# get_agent

```
fetch("http://10.10.12.100/action.php?Form=Agents/agent_registration/agent_registration_edit&modal=1&baseForm=Agents/agent_registration/agent_registration_edit&theme=bars&cache=c6a89837435ba514a3f71c03c4d8629cc&cache_enabled=0&session_cache=1&FormCache=4188e76d0a10ed9b1a9dd1f965df5639", {
  "headers": {
    "accept": "*/*",
    "accept-language": "ru,en;q=0.9",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImI0elphb0lqVlZEQXRrWFRXcWhvMHJSd0g3blRwQjFUQll0QVNONmxqMncifQ.eyJhdWQiOiJtaXMtYXBwIiwiYXpwIjoibWlzLWFwcCIsImlhdCI6MTc4OTEwODU1My41NDA1MTIsImlzcyI6Imh0dHA6Ly9hdXRoLm1pc25wLnJhZGMubXp0dmVyLnJ1L2F1dGgvcmVhbG1zL2F1dGgiLCJleHAiOjE3ODkxMTU3NTMuNTQwNTEyLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJCTUkzIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOltdfX0sInN1YiI6IjEwMjQ0Nzg2MzYyIiwid29ya2luZ19jb250ZXh0Ijp7Im9yZ2FuaXphdGlvbiI6IjgyNzkwNDYxIiwiZW1wbG95ZWUiOiIxMDI0NDc3NDgxMSIsInJvb20iOiI3Mjk2NDk0NzMifSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWlzIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUifQ.ioQwTnt_Bc7GJaZO3qDbtxfdF-Zjn090zIpPcTgH9qVvIUYmRkLSm1yDxNkXqjbHsO6ffia5vE-1ZJXFRqgsjbN8ge_GjWV4FEXhR9H7kASe9D2uG_G7Xvt0238nhRF_j4VTem8sxCggTdGW1IABYApTtEDvrEF2Q7U8-h-Ug9u4SdIqDujU3BGdx9dc9h3euEFHvTsD6qf0VluofFwC2io1pyEDpguTdd8OdE5NHYuIi1f5tHIW4QG0bv1OzeQDvJKORiD8h-Ff21R4dGQxc0kTaAgQHN-YYM0crxbBAKvgIrPPlK3G2WxEK8Jfffm8-r4o4CxqfCvTUMi39VHn1w",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-kl-kfa-ajax-request": "Ajax_Request"
  },
  "referrer": "http://10.10.12.100/",
  "body": "&reg=1&p4=91162322&SiteRegPurpose=1&AgentRegPurpose=75602942&g0=75602942&g1=78340126&division=86036380&raise=0&Action=SITE_BY_REG",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```

# foms

## request

## response, when mo

```
<?xml version="1.0" encoding="UTF-8" ?>
<Action name="getPolisWhoID"   formname="Agents/agent_polis/agent_polis_edit">
<P_WHO_ID>78260509</P_WHO_ID>
</Action>
```

```
<Action name="InitAction" formname="Agents/agent_registration/agent_registration_edit">
<LPUDICT_ID>78340126</LPUDICT_ID>
<LPUDICT_CODE>690029</LPUDICT_CODE>
<p1>78340126</p1>
<p2>690029</p2>
<p4>05.11.2018</p4>
<p5 />
<pAVRP />
<SiteReq>0</SiteReq>
<hideFERZLButton_p0>0</hideFERZLButton_p0>
<reg>1</reg>
<reg_date>05.11.2018</reg_date>
<remreg>0</remreg>
</Action>
```

```
<Action name="InitAction" formname="Agents/agent_registration/agent_registration_edit">
<LPUDICT_ID>78340126</LPUDICT_ID>
<LPUDICT_CODE>690029</LPUDICT_CODE>
<p1>78340126</p1>
<p2>690029</p2>
<p4>05.11.2018</p4>
<p5 />
<pAVRP />
<SiteReq>0</SiteReq>
<hideFERZLButton_p0>0</hideFERZLButton_p0>
<reg>1</reg>
<reg_date>05.11.2018</reg_date>
<remreg>0</remreg>
</Action>
```

```
<div   cmptype="form" oncreate="base().OnCreate();" onclose="base().OnClose();" onshow="base().OnShow();" class="agent_registration_edit" scrollable="true" formname="Agents/agent_registration/agent_registration_edit">
    <div   cmptype="title">Карта пациента: Прикрепление</div>
    <textarea   cmptype="Script" name="MainScript" scrollable="true" formname="Persmedcard/subforms_view/check_reg_purpose_age" style="display:none;">
    
        Form.RegPurposes = {
            1: 'Поликлиническая помощь (взрослая)',
            2: 'Поликлиническая помощь (детская)',
        };
        Form.RegPurposesAdult = [1];
        Form.RegPurposesChild = [2];
        Form.CheckRegPurposeAge = function(_val, _cb_yes, _cb_no) {
            var _data = getControlByName('REGISTER_PURPOSE').selected_item.clone.data;
            var _title = 'Проверять возраст пациента при оформлении прикрепления';
            var cb_no = _cb_no || emptyFunction;
            if (!empty(getVar('BIRTHDATE'))
                    && getVar('PAT_FULL_YEARS') < 18
                    && ~Form.RegPurposesAdult.indexOf(+_data['CODE'])) {
                if (_val === 1) {
                    showConfirm('Вы уверены, что хотите прикрепить пациента, не достигшего 18 лет, с целью прикрепления "' + Form.RegPurposes[_data['CODE']] + '"?',
                            null, 450, 80, _cb_yes, cb_no);
                }
                if (_val === 2) {
                    showAlert('Действует запрет на возможность прикрепить пациента младше 18 лет, с целью прикрепления "' + Form.RegPurposes[_data['CODE']] + '"', _title, 400, 80);
                }
                return;
            } else if (!empty(getVar('BIRTHDATE'))
                    && getVar('PAT_FULL_YEARS') >= 18
                    && ~Form.RegPurposesChild.indexOf(+_data['CODE'])) {
                if (_val === 1) {
                    D3Api.showConfirm('Вы уверены, что хотите прикрепить пациента старше 18 лет, с целью прикрепления "' + Form.RegPurposes[_data['CODE']] + '"?',
                        function() {
                            _cb_yes && _cb_yes();
                        },
                        function() {
                            cb_no && cb_no();
                        });
                    return;
                }
                if (_val === 2 && (+getVar('MARKER_PRIK_ONKO') !== 1 || +getVar('SO_REG_ONKO') !== 1 || +getVar('PAT_FULL_YEARS') > 21)) {
                    D3Api.showAlert('Действует запрет на возможность прикрепить пациента старше 18 лет, с целью прикрепления "' + Form.RegPurposes[_data['CODE']] + '"', null,
                        {
                            title: _title,
                            width: 400,
                            height: 80
                        });
                } else {
                    _cb_yes && _cb_yes();
                }
                return;
            }
            _cb_yes && _cb_yes();
            return true;
        };
    
</textarea>
	<textarea   cmptype="Script" name="MainScript" style="display:none;">
        
            Form.OnCreate = function () {
                var primary = getVar("PRIMARY", 1);
                var parent = getVar("PARENT", 1);
                setVar('COPY', getVar('COPY', 1) || getVar('COPY'));
                if (!empty(primary)) {
                    setVar("ID", primary);
                }

                if (!empty(parent)) {
                    setVar("PID", parent);
                } else {
                    setVar("PID", getVar('AGENT', 1));
                }

                if (!empty(getVar("ID"))) {
                    if (getVar('COPY') == 1) {
                        setVar("action", "INSERT");
                        setWindowCaption("Прикрепление: копирование");
                    } else {
                        setVar("action", "UPDATE");
                        setWindowCaption("Прикрепление: редактирование");
                    }
                } else {
                    setVar("action", "INSERT");
                    setWindowCaption("Прикрепление: добавление");
                }
                setVar('form_type', getVar('form_type') || ((getVar('action') === 'INSERT') ? 'add_reg' : 'edit_reg'));
                setVar('ADDRS_ID', getVar('ADDRS_ID', 1));
                executeAction('InitAction', function () {
                    getControlByName('FERZLServiceRequest').style.display = +getVar('hideFERZLButton') ? '' : 'none';
                    setVar('AV_RP', getVar('AvailableRegPurpose'));
                }, null, null, 0, 0);
                executeAction('getLPU');
                setVar("ModalResult", 0, 1);

                let regDateInput = getControlByName('LPU_REG_DATE').querySelector('input');
                regDateInput && regDateInput.addEventListener('blur', () => {
                    Form.onlpuRegDateChange();
                });
            };
            Form.OnShow = function () {
                if (getVar("action") == "UPDATE" || getVar('COPY') == 1) {
                    executeAction('SelectAction');
                }
                if (getVar("action") == "INSERT") {
                    base().SetLPUDICT();
                    setValue("LPU_STATE_BEGIN", SysDate('dd.mm.yyyy'));
                }
                CheckDatesBeginEnd('LPU_STATE_BEGIN', 'LPU_STATE_END');
                if (+getVar('PmcRegSiteRequired') === 1) {
                    MaskInspector_addControl('mainInspector', 'LPU_REG_LPU_SITE');
                }
            };
            Form.OnClose = function () {
                setVar('COPY', null, 1);
                setVar('PRIMARY', null, 1);
                setVar("CURRENT_REGISTRATION_ID", null, 1);
            };

            Form.checkRegPurpose = function(data) {
                if (empty(getVar('BIRTHDATE')) && isExistsControlByName('BIRTHDATE')) {
                    setVar('BIRTHDATE', getValue('BIRTHDATE'));
                }
                setVar('REG_DATE_BEGIN', getValue('LPU_STATE_BEGIN'));
                startActionsGroup();
                    executeAction('getPatFullYears');
                    executeAction('getRegOnkoOptions');
                endActionsGroup(null, function() {
                    if (!Form.CheckRegPurposeAge(data, Form.checkAction)) {
                        return;
                    }
                });
            };

            Form.onlpuRegDateChange = function() {
                if (!getVar('form_type') || (getVar('form_type') !== 'edit_reg')) {
                    setValue('LPU_STATE_BEGIN', getValue('LPU_REG_DATE'));
                }
            }

            Form.OnButtonOk = function () {
                if (empty(getValue('LPU_REG'))) {
                    alert('Заполните ЛПУ регистрации!');
                    return;
                }
                Form.onlpuRegDateChange();
                var checkRegPurposeAge = +getVar('CheckRegPurposeAge');
                if (checkRegPurposeAge in Form.RegPurposes) {
                    if (getVar('SORegPurVal') && getVar('BEGIN_DATE_REG')) {
                        var arrayOfSORegPur = getVar('SORegPurVal').split(';');
                        if (getVar('LPU_FROM') !== getVar('LPU_REG_ID') && +getValue('REG_TYPE') === 1 && +getVar('REG_TYPE_CODE') === 1 && arrayOfSORegPur.includes(getVar('REG_PURPOSE_CODE')) && (!getVar('END_DATE_REG') || getDateCompare(getValue('LPU_REG_DATE'), getVar('END_DATE_REG')))) {
                            D3Api.showAlert('Существуют пересечения с предыдущими прикреплениями по цели прикрепления и типом регистрации "Территориальный" в другой МО, прикрепление запрещено.')
                        } else {
                            Form.checkRegPurpose(checkRegPurposeAge);
                        }
                    } else {
                        Form.checkRegPurpose(checkRegPurposeAge);
                    }
                } else {
                    if (getVar('SORegPurVal') && getVar('BEGIN_DATE_REG')) {
                        var arrayOfSORegPur = getVar('SORegPurVal').split(';');
                        if (getVar('LPU_FROM') !== getVar('LPU_REG_ID') && +getValue('REG_TYPE') === 1 && +getVar('REG_TYPE_CODE') === 1 && arrayOfSORegPur.includes(getVar('REG_PURPOSE_CODE')) && (!getVar('END_DATE_REG') || getDateCompare(getValue('LPU_REG_DATE'), getVar('END_DATE_REG')))) {
                            D3Api.showAlert('Существуют пересечения с предыдущими прикреплениями по цели прикрепления и типом регистрации "Территориальный" в другой МО, прикрепление запрещено.')
                        } else {
                            base().checkAction();
                        }
                    } else {
                        base().checkAction();
                    }
                }
            };
            Form.checkAction = function() {
                executeAction('BEFORE_CHECK', function() {
                    if (+getVar('IS_ERRORS') && !empty(getVar('MSG'))) {
                        if (+getVar('IS_ERRORS') === 2) {
                            function addUpd() {
                                if (!empty(getVar('MSG'))) {
                                    if (confirm(getVar('MSG'))) {
                                        executeAction('ADDUPDATE_ACTION', base().OnSuccessAddUpdate);
                                    } else {
                                        closeWindow();
                                        return;
                                    }
                                }
                            }

                            if (typeof(base().UF_beforeAddUpd) === 'function') {
                                base().UF_beforeAddUpd(addUpd);
                            } else {
                                addUpd();
                            }
                            return;
                        }
                        D3Api.showAlert('Форма заполнена с ошибками: ' + getVar('MSG'));
                        return;
                    }

                    if (!empty(getVar('MSG')) && !confirm(getVar('MSG') + '\nПродолжить?')) {
                        return;
                    }

                    executeAction('ADDUPDATE_ACTION', Form.OnSuccessAddUpdate);
                });
            };
            Form.OnSuccessAddUpdate = function () {
                if (getVar("action") == "INSERT") {
                    setVar("newid", getVar("NEW_ID"), 1);
                }
                setVar("ModalResult", 1, 1);
                closeWindow();
            };

        Form.FERZLServiceRequest = function() {
            openMISNGForm('FerzlPatientIntegrationWindow', {
                mode: 'slideUp',
                paddingH: 0,
                paddingV: 0,
                props: {
                    cardIdOrData: getVar('ID'),
                    mode: !empty(getVar('ID')) ? 'edit' : 'create',
                    cardType: Form.getMISNGCardType(getVar('PMC_TYPE'))
                },
                windowProps: {
                    windowClass: 'integration-window'
                }
            });
        };

        Form.getMISNGCardType = function(cardType) {
            switch (+cardType) {
                case 1:
                    return 'anonym';
                case 2:
                    return 'newBorn';
                case 3:
                    return 'unknown';
                default:
                    return 'patient';
            }
        };
        
    </textarea>
    

    

    
    
	
	
	
	

    <div   class="main" cmptype="tmp" name="DIV_MAIN_WRAPPER">
        <div   class="form-container">
            <div   cmptype="tmp" oncreate="base().onCreateRegForm();" onshow="base().onShowRegForm();" class="pers_sub_fields_registration" scrollable="true" formname="Persmedcard/subforms_fields/registration">
    <textarea   cmptype="Script" name="cmp6aaccabe6f789" style="display:none;">
        
        Form.onCreateRegForm = function () {
            executeAction('initRegistrationForm', emptyFunction, emptyFunction, this, false);
            if(!empty(getVar('form_type')) && (getVar('form_type') == 'edit_reg')) {
                setDomVisible(getControlByName('DATE_REG'), false);
            } else {
                setDomVisible(getControlByName('DATE_REG_S_PO'), false);
            }
            if((getVar('action') == 'INSERT') && empty(getVar('COPY'))) {
                executeAction('getRegPurpose', emptyFunction, emptyFunction, this, false);
            }
            getPage(0).addListener('onchangepropertyLPU_REG',
                    function (_dom, _cn, _pn, _pv) {
                        if(_pn == 'value' && _cn == 'LPU_REG') {
                            base().SetLPUDICT();
                        }
                    }, base(), false);
        }
        Form.onShowRegForm = function () {
            base().initCheckCurrLpu();
            if((getVar('action') == 'INSERT') && empty(getVar('COPY'))) {
                base().setSite(false);
            }
        }

        Form.initCheckCurrLpu = function () {
            var RemoteRegAllow = +getVar('RemoteRegAllow');
            var enabled_change_lpu = (RemoteRegAllow !== 0);
            setControlProperty('CURR_LPU_REG', 'enabled', enabled_change_lpu);
            if(+getVar('LPUDICT_ID') === +getValue('LPU_REG')) {
                setControlProperty('CURR_LPU_REG', 'checked', true);
                enabled_change_lpu = false;
            }
            setControlProperty('LPU_REG', 'enabled', enabled_change_lpu);
            setControlProperty('LPU_REG_CLEAR', 'enabled', enabled_change_lpu);
        }

        Form.changeCheckCurrLpu = function () {
            var RemoteRegAllow = +getVar('RemoteRegAllow');
            var enabled_change_lpu = (RemoteRegAllow !== 0);
            if(getControlProperty('CURR_LPU_REG', 'checked')) {
                setValue('LPU_REG', getVar('LPUDICT_ID'));
                setCaption('LPU_REG', getVar('LPUDICT_CODE'));
                enabled_change_lpu = false;
            }
            setControlProperty('LPU_REG', 'enabled', enabled_change_lpu);
            setControlProperty('LPU_REG_CLEAR', 'enabled', enabled_change_lpu);
        }
        Form.setSiteOptions = function () {
            if(getValue('LPU_REG_LPU_SITE')) {
                executeAction('getSiteOptions', function () {
                    if(empty(getValue('DIVISION')) && !empty(getVar('DIVISION'))) {
                        setValue('DIVISION', getVar('DIVISION'));
                        setCaption('DIVISION', getVar('DIVISION_NAME'));
                    }
                    if(!empty(getVar('REGISTER_PURPOSE'))) {
                        setValue('REGISTER_PURPOSE', getVar('REGISTER_PURPOSE'));
                    }
                });
            }
        }
        Form.setSite = function (raise) {
            raise = typeof raise !== 'undefined' ? raise : true;
            if(!empty(getValue('REG_TYPE'))) {
                if(empty(getVar('AGENT'))) {
                    setVar('AGENT', getVar('PID'));
                }
                setVar('hide_error_site_by_reg', +(!raise));
                executeAction('SITE_BY_REG', base().setSiteOptions);
            }
        }
        Form.changeLPU = function () {
            var is_fill_lpu_reg = !empty(getValue('LPU_REG'));
            ['LPU_REG_LPU_SITE', 'DIVISION'].forEach(function (ctrl_name) {
                setControlProperty(ctrl_name, 'enabled', is_fill_lpu_reg);
                setControlProperty(ctrl_name + '_CLEAR', 'enabled', is_fill_lpu_reg);
            });
            if(is_fill_lpu_reg) {
                if(+getValue('LPU_REG') === +getVar('LPUDICT_ID')) {
                    setControlProperty('GetSiteButton', 'enabled', true);
                } else {
                    executeAction('checkLpudictHid', function () {
                        setControlProperty('GetSiteButton', 'enabled', +getVar('IS_LPU') !== 0);
                    });
                }
            } else {
                setControlProperty('GetSiteButton', 'enabled', false);
            }
            if(+getValue('LPU_REG') !== +getVar('LPU_REG')) {
                clearControl('DIVISION', 'LPU_REG_LPU_SITE');
            }
            setVar('LPU_REG', getValue('LPU_REG'));
        }
        Form.selectLpuReg = function () {
            var win_obj = {
                name: 'UniversalComposition/UniversalComposition',
                unit: 'LPUDICT',
                composition: 'LPUDICT_BY_LPU'
            };
            if(getControlProperty('CURR_LPU_REG', 'checked') || (+getVar('RemoteRegAllow') === 2)) {
                win_obj.vars = {'ONLY_CURR_LPU': 1};
            }
            openWindow(win_obj, true)
                    .addListener('onafterclose', function () {
                        if(+getVar('ModalResult') === 1) {
                            setValue('LPU_REG', getVar('return_id'));
                            setCaption('LPU_REG', getVar('return'));
                            setVar('ModalResult', '');
                        }
                    });
        }
        Form.clearLpuReg = function () {
            clearControl('LPU_REG', 'DIVISION', 'LPU_REG_LPU_SITE');
            base().changeLPU();
        }
        Form.selectDivisions = function () {
            openWindow({
                name: 'UniversalComposition/UniversalComposition', unit: 'DIVISIONS', composition: 'GRID_BASE',
                vars: {'LPUDICT': getValue('LPU_REG')}
            }, true)
                    .addListener('onafterclose', function () {
                        if(+getVar('ModalResult') === 1) {
                            if(getValue('DIVISION') != getVar('return_id')) {
                                clearControl('LPU_REG_LPU_SITE');
                            }
                            setValue('DIVISION', getVar('return_id'));
                            setCaption('DIVISION', getVar('return'));
                            setVar('ModalResult', '');
                        }
                    });
        }
        Form.selectSites = function () {
            var filterSites = '';

            if(+getVar('SiteRegPurpose') === 1 && (getValue('REGISTER_PURPOSE') || getVar('AgentRegPurpose'))) {
                filterSites = 'REGISTER_PURPOSE_ID = ' + (getValue('REGISTER_PURPOSE') || getVar('AgentRegPurpose')) + ' and ';
            }
            if(!empty(getValue('DIVISION'))) {
                filterSites += 'DIVISION_ID = ' + getValue('DIVISION');
            } else {
                filterSites += 'LPUDICT_ID in(select l.id from d_v_lpudict l connect by prior l.id = l.hid start with l.id = ' + getValue('LPU_REG') + ')';
            }

            openWindow({
                name: 'UniversalComposition/UniversalComposition', unit: 'SITES', composition: 'SITES_BY_LPU',
                'filter': {0: {'unit': 'SITES', 'method': 'CHILD_LPU', 'filter': filterSites}}
                , show_buttons: true
            }, true)
                    .addListener('onafterclose', function () {
                        if(+getVar('ModalResult') === 1) {
                            setValue('LPU_REG_LPU_SITE', getVar('return_id'));
                            setCaption('LPU_REG_LPU_SITE', getVar('return'));
                            base().setSiteOptions();
                            setVar('ModalResult', '');
                        }
                    });
        }
        Form.SetLPUDICT = function () {
            if(isExistsControlByName('LPU_REG_LPU_SITE') && !empty(getValue('LPU_REG'))) {
                setControlProperty('LPU_REG_LPU_SITE', 'enabled', true);
                setControlProperty('LPU_REG_LPU_SITE_CLEAR', 'enabled', true);
                setControlProperty('REG_TYPE', 'enabled', true);
                setControlProperty('LPU_REG_DATE', 'enabled', true);
                setValue('LPU_REG_DATE', SysDate('dd.mm.yyyy'));
                setVar('IS_STATE', true);
                if(base().ChangeAddrs instanceof Function) {
                    base().ChangeAddrs();
                }
            }
            base().changeLPU();
        }
        Form.changeRegPurpose = function () {
            var data = getDataSet('DS_REGISTER_PURPOSES').data;
            if(+getVar('SiteRegPurpose') === 1) {
                clearControl('LPU_REG_LPU_SITE');
            }

            for (var i = 0; i < data.length; i++) {
                if (+data[i]['ID'] === +getValue('REGISTER_PURPOSE')) {
                    setVar('REG_PURPOSE_CODE', data[i]['CODE']);
                    break;
                }
            }
        }
        Form.onAddNumPref = function() {
            executeAction('addNumPref', function() {
                if(+getValue('REG_TYPE') === 3) {
                    setValue('REG_DOC_NUMB', getVar('REG_NUMB'));
                }
            });
        }
        Form.showSitesHistory = function() {
            openD3Form('Persmedcard/subforms_fields/registration_sites_history', true, {
                width: 1020, height: 700,
                vars: {
                    AGENT_REG: getVar('ID')
                }
            });
        };
        
    </textarea>
    
    
    

    

    

    

    

    

    

    

    <div   class="main">
        <div   class="form-container">
            <table   class="form-table">
                <tr  >
                    <td  >
                        <div   class="fl-cont-end">
                            <span  cmptype="Label" name="cmp6aaccabe71fc9"  >МО:</span>
                            <span  cmptype="CheckBox" name="CURR_LPU_REG" class="curr-lpu" enabled="false" ><input  type="checkbox" disabled  onchange="base().changeCheckCurrLpu();"/><span class="disable">текущее</span></span>
                        </div>
                    </td>
                    <td  >
                        <table class=" editControl button-edit" valign="bottom"  cmptype="ButtonEdit" name="LPU_REG" unit="LPUDICT" composition="LPUDICT_BY_LPU" width="100%" cssstyle="button-edit" addclass=" editControl"  cellpadding="0" cellspacing="0"><tr class="be"><td class="td_edit_control btne-input"><input onclick="ButtonEdit_EditClick(this, event)" type= "text" class="input-ctrl" style="" readonly="true"/></td><td class="td_edit_control btne-button noselect"><img src="Images/s22.gif" class="button-edit button-edit-enable" style="" ondragstart="return false;" onclick="if (_getControlProperty(buttonEdit_getControl(this), 'enabled')){base().selectLpuReg();}"/></td><td class="td_edit_control" info="auto" style="width:20px">
                            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){base().clearLpuReg();}"   cmptype="Button" name="LPU_REG_CLEAR" type="micro" class="btn-block noselect "  style="background-image: url('Icons/btn_erase');" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" ></td>
				<td class="btnr"></td>
			</tr>
			</table>
                        </td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe72407"  >Подразделение</span>
                    </td>
                    <td  >
                        <table class=" editControl button-edit" valign="bottom"  cmptype="ButtonEdit" name="DIVISION" unit="DIVISIONS" composition="GRID_BASE" width="100%" cssstyle="button-edit" addclass=" editControl"  cellpadding="0" cellspacing="0"><tr class="be"><td class="td_edit_control btne-input"><input onclick="ButtonEdit_EditClick(this, event)" type= "text" class="input-ctrl" style="" readonly="true"/></td><td class="td_edit_control btne-button noselect"><img src="Images/s22.gif" class="button-edit button-edit-enable" style="" ondragstart="return false;" onclick="if (_getControlProperty(buttonEdit_getControl(this), 'enabled')){base().selectDivisions();}"/></td><td class="td_edit_control" info="auto" style="width:20px">
                            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){clearControl('DIVISION','LPU_REG_LPU_SITE');}"   cmptype="Button" name="DIVISION_CLEAR" type="micro" class="btn-block noselect "  style="background-image: url('Icons/btn_erase');" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" ></td>
				<td class="btnr"></td>
			</tr>
			</table>
                        </td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe72619"  >Цель прикрепления</span>
                    </td>
                    <td  >
                        <table class=" editControl combo-box combo-box-enable" valign="bottom"  cmptype="ComboBox" name="REGISTER_PURPOSE" width="100%" emptymask="true" onchange="base().changeRegPurpose();" cssstyle="combo-box" addclass=" editControl" oncreate="ComboBox_Create(this);" onpostclone="ComboBox_PostClone(this);"  cellpadding="0" cellspacing="0"><tr><td class="td_edit_control cmbb-input"><input onchange="stopEvent(event)" type="text" class="input-ctrl" onclick="ComboBox_DownClick(this);" onkeydown="ComboBox_KeyDownInput(event,this);" onkeyup="ComboBox_KeyUpInput(event,this);" readonly="" onblur=""/></td><td class="td_edit_control cmbb-button"><img src="Images/s22.gif" class="combo-box combo-box-enable" onclick="ComboBox_DownClick(this)" ondragstart="return false;"/></td></tr><tr><td class="cmbb-droplist" colspan="2"><div cmptype="tmp" name="ComboItemsList_REGISTER_PURPOSE" class="combo-box-drop-list"  style="display: none;"><table>
                            
            <tr  cmptype="ComboItem" value="" name="cmp6aaccabe727d9" comboboxname="REGISTER_PURPOSE"  selected="true" >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
                            
            <tr  cmptype="ComboItem" afterrefresh="ComboBox_AfterRefresh(this);setValue('REGISTER_PURPOSE',getVar('REGISTER_PURPOSE_LOC'));" name="cmp6aaccabe72873" onrefresh="refreshComboBox(this,args);" comboboxname="REGISTER_PURPOSE"  dataset="DS_REGISTER_PURPOSES" datafield="ID" captionfield="NAME" repeate="0"  >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
                        </table></div></td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe7293d"  >Тип прикрепления</span>
                    </td>
                    <td  >
                        <table class=" editControl combo-box combo-box-enable" valign="bottom"  unit="REGISTRATION_TYPES" cmptype="ComboBox" name="REG_TYPE" width="100%" emptymask="true" onchange="base().onAddNumPref();" cssstyle="combo-box" addclass=" editControl" oncreate="ComboBox_Create(this);" onpostclone="ComboBox_PostClone(this);"  cellpadding="0" cellspacing="0"><tr><td class="td_edit_control cmbb-input"><input onchange="stopEvent(event)" type="text" class="input-ctrl" onclick="ComboBox_DownClick(this);" onkeydown="ComboBox_KeyDownInput(event,this);" onkeyup="ComboBox_KeyUpInput(event,this);" readonly="" onblur=""/></td><td class="td_edit_control cmbb-button"><img src="Images/s22.gif" class="combo-box combo-box-enable" onclick="ComboBox_DownClick(this)" ondragstart="return false;"/></td></tr><tr><td class="cmbb-droplist" colspan="2"><div cmptype="tmp" name="ComboItemsList_REG_TYPE" class="combo-box-drop-list"  style="display: none;"><table>
    
            <tr  cmptype="ComboItem" name="cmp6aaccabe7721d" comboboxname="REG_TYPE"  selected="true" >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
    
            <tr  cmptype="ComboItem" name="cmp6aaccabe772c1" afterrefresh="ComboBox_AfterRefresh(this);" onrefresh="refreshComboBox(this,args);" comboboxname="REG_TYPE"  dataset="REG_TYPE_dataset" datafield="RT_CODE" captionfield="RT_NAME" repeate="0"  >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
</table></div></td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe77406"  >Номер участка</span>
                    </td>
                    <td  >
                        <div   class="fl-cont">
                            <table class=" editControl button-edit" valign="bottom"  cmptype="ButtonEdit" name="LPU_REG_LPU_SITE" unit="SITES" composition="SITES_BY_LPU" max-width="100%" emptymask="true" width="144px" cssstyle="button-edit" addclass=" editControl"  cellpadding="0" cellspacing="0"><tr class="be"><td class="td_edit_control btne-input"><input onclick="ButtonEdit_EditClick(this, event)" type= "text" class="input-ctrl" style="" readonly="true"/></td><td class="td_edit_control btne-button noselect"><img src="Images/s22.gif" class="button-edit button-edit-enable" style="" ondragstart="return false;" onclick="if (_getControlProperty(buttonEdit_getControl(this), 'enabled')){base().selectSites();}"/></td><td class="td_edit_control" info="auto" style="width:20px">
                                
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){clearControl('LPU_REG_LPU_SITE');}"   cmptype="Button" name="LPU_REG_LPU_SITE_CLEAR" type="micro" class="btn-block noselect "  style="background-image: url('Icons/btn_erase');" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" ></td>
				<td class="btnr"></td>
			</tr>
			</table>
                            </td></tr></table>
                            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){base().setSite();}"   cmptype="Button" name="GetSiteButton" class="btn-block noselect ml-4"  style="" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" >Получить участок</td>
				<td class="btnr"></td>
			</tr>
			</table>
                            <a  cmptype="HyperLink" name="ShowSitesHistoryButton" onclick="Form.showSitesHistory();" href="javascript:void(0)"  >
                                <img   src="Images/s.gif" class="pmc_history mr-2" title="История"></img>
                            </a>
                        </div>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe77a11"  >Номер заявления</span>
                    </td>
                    <td  >
                        <table  cmptype="Edit" name="REG_DOC_NUMB"   class="editControl" cellspacing="0" cellpadding="0" style="vertical-align:bottom; width:100%;  display:inline-table;"><tr><td class="td_edit_control"><input type="text" value="" class="input-ctrl"/></td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe77c73"  >Категория</span>
                    </td>
                    <td  >
                        <table class=" editControl combo-box combo-box-enable" valign="bottom"  unit="REG_CATEGORIES" cmptype="ComboBox" name="REG_CATEGORY" width="100%" cssstyle="combo-box" addclass=" editControl" oncreate="ComboBox_Create(this);" onpostclone="ComboBox_PostClone(this);"  cellpadding="0" cellspacing="0"><tr><td class="td_edit_control cmbb-input"><input onchange="stopEvent(event)" type="text" class="input-ctrl" onclick="ComboBox_DownClick(this);" onkeydown="ComboBox_KeyDownInput(event,this);" onkeyup="ComboBox_KeyUpInput(event,this);" readonly="" onblur=""/></td><td class="td_edit_control cmbb-button"><img src="Images/s22.gif" class="combo-box combo-box-enable" onclick="ComboBox_DownClick(this)" ondragstart="return false;"/></td></tr><tr><td class="cmbb-droplist" colspan="2"><div cmptype="tmp" name="ComboItemsList_REG_CATEGORY" class="combo-box-drop-list"  style="display: none;"><table>
    
            <tr  cmptype="ComboItem" name="cmp6aaccabe7c288" comboboxname="REG_CATEGORY"  selected="true" >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
    
            <tr  cmptype="ComboItem" name="cmp6aaccabe7c38a" afterrefresh="ComboBox_AfterRefresh(this);" onrefresh="refreshComboBox(this,args);" comboboxname="REG_CATEGORY"  dataset="REG_CATEGORY_dataset" datafield="ID" captionfield="RC_NAME" repeate="0"  >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
</table></div></td></tr></table>
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe7c4f3"  >Примечание</span>
                    </td>
                    <td  >
                        <table  cmptype="Edit" name="REG_NOTE"   class="editControl" cellspacing="0" cellpadding="0" style="vertical-align:bottom; width:100%;  display:inline-table;"><tr><td class="td_edit_control"><input type="text" value="" class="input-ctrl"/></td></tr></table>
                    </td>
                </tr>
                <tr   cmptype="tmp" name="DATE_REG">
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe7c75e"  >Дата регистрации</span>
                    </td>
                    <td  >
                        
            <div class='editControl date-edit'  cmptype="DateEdit" typemask="date" emptymask="true" name="LPU_REG_DATE" onchange="Form.onlpuRegDateChange();"  >
                <div class="editControlInner" style="">
                    <input 
                           type="text"
                           value=""
                           onblur=""
                           onfocus=""
                           ondblclick=""
                           class="input-ctrl"
                           style="width:90px;"
                           placeholder=""
                    />
                    <div onclick='return showCalendar(this);' class='img-calendar calendar-enable noselect' ondragstart='return false;'></div>
                </div>
                <div cmptype='tmp' name='LPU_REG_DATE_showCalendar' style='position: absolute;z-index: 1'></div>
            </div>
        
                    </td>
                </tr>
                <tr   cmptype="tmp" name="DATE_REG_S_PO">
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe7ca75"  >Действует c</span>
                    </td>
                    <td  >
                        
            <div class='editControl date-edit'  cmptype="DateEdit" typemask="date" emptymask="true" name="LPU_STATE_BEGIN"  >
                <div class="editControlInner" style="">
                    <input 
                           type="text"
                           value=""
                           onblur=""
                           onfocus=""
                           ondblclick=""
                           class="input-ctrl"
                           style="width:90px;"
                           placeholder=""
                    />
                    <div onclick='return showCalendar(this);' class='img-calendar calendar-enable noselect' ondragstart='return false;'></div>
                </div>
                <div cmptype='tmp' name='LPU_STATE_BEGIN_showCalendar' style='position: absolute;z-index: 1'></div>
            </div>
        
                        <span  cmptype="Label" name="cmp6aaccabe7ccc8"  >по</span>
                        
            <div class='editControl date-edit'  cmptype="DateEdit" typemask="date" emptymask="false" name="LPU_STATE_END"  >
                <div class="editControlInner" style="">
                    <input 
                           type="text"
                           value=""
                           onblur=""
                           onfocus=""
                           ondblclick=""
                           class="input-ctrl"
                           style="width:90px;"
                           placeholder=""
                    />
                    <div onclick='return showCalendar(this);' class='img-calendar calendar-enable noselect' ondragstart='return false;'></div>
                </div>
                <div cmptype='tmp' name='LPU_STATE_END_showCalendar' style='position: absolute;z-index: 1'></div>
            </div>
        
                    </td>
                </tr>
                <tr  >
                    <td  >
                        <span  cmptype="Label" name="cmp6aaccabe7cf24"  >Причина снятия с учета</span>
                    </td>
                    <td  >
                        <table class=" editControl combo-box combo-box-enable" valign="bottom"  cmptype="ComboBox" name="END_REASON" width="100%" cssstyle="combo-box" addclass=" editControl" oncreate="ComboBox_Create(this);" onpostclone="ComboBox_PostClone(this);"  cellpadding="0" cellspacing="0"><tr><td class="td_edit_control cmbb-input"><input onchange="stopEvent(event)" type="text" class="input-ctrl" onclick="ComboBox_DownClick(this);" onkeydown="ComboBox_KeyDownInput(event,this);" onkeyup="ComboBox_KeyUpInput(event,this);" readonly="" onblur=""/></td><td class="td_edit_control cmbb-button"><img src="Images/s22.gif" class="combo-box combo-box-enable" onclick="ComboBox_DownClick(this)" ondragstart="return false;"/></td></tr><tr><td class="cmbb-droplist" colspan="2"><div cmptype="tmp" name="ComboItemsList_END_REASON" class="combo-box-drop-list"  style="display: none;"><table>
                            
            <tr  cmptype="ComboItem" value="" name="cmp6aaccabe7d14e" comboboxname="END_REASON"   >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
                            
            <tr  cmptype="ComboItem" name="cmp6aaccabe7d238" afterrefresh="ComboBox_AfterRefresh(this);" onrefresh="refreshComboBox(this,args);" comboboxname="END_REASON"  dataset="DS_REMOVE_REASONS" datafield="NOTE" captionfield="SVALUE" repeate="0"  >
                <td>
                    <div class="item_block">
                        <span class="btnOCM"></span>
                        <span cont="itemcaption"></span>
                    </div>
                </td>
            </tr>
        
                        </table></div></td></tr></table>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <style  >
        .pers_sub_fields_registration > .main > .form-container > .form-table {
            table-layout: fixed;
        }
        .pers_sub_fields_registration > .main > .form-container > .form-table > tbody > tr > td:nth-child(1) {
            text-align: right;
        }
        .pers_sub_fields_registration > .main > .form-container > .form-table .fl-cont-end {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .pers_sub_fields_registration > .main > .form-container > .form-table .fl-cont {
            display: flex;
            align-items: center;
        }
        .pers_sub_fields_registration > .main > .form-container > .form-table .curr-lpu {
            display: flex;
            align-items: center;
            padding-left: 8px;
        }
        .pers_sub_fields_registration > .main > .form-container > .form-table .ml-4 {
            margin-left: 4px;
        }
    </style>
</div>
        </div>
        <div   class="buttons">
            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){Form.FERZLServiceRequest();}"   cmptype="Button" name="FERZLServiceRequest" class="btn-block noselect "  style="" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" >Запрос в ФЕРЗЛ</td>
				<td class="btnr"></td>
			</tr>
			</table>
            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){base().OnButtonOk();}"   cmptype="Button" name="BUTTON_OK" class="btn-block noselect "  style="" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" >ОК</td>
				<td class="btnr"></td>
			</tr>
			</table>
            
			<table onclick="if(!hasClass(this,'btn-disable noselect') &amp;&amp; !hasClass(this,'ctrl_disable')){closeWindow();}"   cmptype="Button" name="cmp6aaccabe7d583" class="btn-block noselect "  style="" >
			<tr class="bt">
				<td class="btnl"></td>
                                
				<td class="btnc btnc-caption minwidth" >Отмена</td>
				<td class="btnr"></td>
			</tr>
			</table>
        </div>
    </div>
    <div oncreate="new DMaskInspector(this);"  cmptype="MaskInspector" name="mainInspector" effectcontrols="BUTTON_OK" controls="LPU_STATE_BEGIN;LPU_STATE_END;REG_TYPE;REGISTER_PURPOSE;LPU_REG_DATE"></div>

    <style   cmptype="tmp" name="MainStyle">
        .agent_registration_edit > .main {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .agent_registration_edit > .main > .form-container {
            flex-grow: 1;
            margin-bottom: 8px;
            overflow: auto;
        }
        .agent_registration_edit > .main > .buttons {
            text-align: right;
        }
    </style>
<div cmptype="sysinfo" style="display:none;">
<Action  formname="Agents/agent_registration/agent_registration_edit"   name="BEFORE_CHECK" ><Var src="LPU"  srctype="session" ></Var><Var name="ID"  get="ID_g0"  src="ID"  srctype="var" ></Var><Var name="PID"  get="PID_g1"  src="PID"  srctype="var" ></Var><Var name="REG_TYPE"  get="REG_TYPE_g2"  src="REG_TYPE"  srctype="ctrl" ></Var><Var name="LPU_REG"  get="LPU_REG_g3"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="LPU_SITE"  get="LPU_SITE_g4"  src="LPU_REG_LPU_SITE"  srctype="ctrl" ></Var><Var name="REG_DATE"  get="REG_DATE_g5"  src="LPU_REG_DATE"  srctype="ctrl" ></Var><Var name="BEGIN_DATE"  get="BEGIN_DATE_g6"  src="LPU_STATE_BEGIN"  srctype="ctrl" ></Var><Var name="END_DATE"  get="END_DATE_g7"  src="LPU_STATE_END"  srctype="ctrl" ></Var><Var name="REGISTER_PURPOSE"  get="REGISTER_PURPOSE_g8"  src="REGISTER_PURPOSE"  srctype="ctrl" ></Var><Var name="DIVISION"  get="DIVISION_g9"  src="DIVISION"  srctype="ctrl" ></Var><Var name="ACTION"  get="ACTION_g10"  src="ACTION"  srctype="var" ></Var><Var name="MSG"  put="MSG_p0"  src="MSG"  srctype="var" ></Var><Var name="IS_ERRORS"  put="IS_ERRORS_p1"  src="IS_ERRORS"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"   name="getLPU" ><Var src="LPU"  srctype="session" ></Var><Var name="LPU_FROM"  put="LPU_FROM_p0"  src="LPU_FROM"  srctype="var" ></Var><Var name="SORegPurVal"  put="SORegPurVal_p1"  src="SORegPurVal"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"   name="InitAction" ><Var src="LPU"  srctype="session" ></Var><Var name="ID"  get="v0"  src="ID"  srctype="var" ></Var><Var name="LPUDICT_ID"  put="LPUDICT_ID"  src="LPUDICT_ID"  srctype="var" ></Var><Var name="LPUDICT_CODE"  put="LPUDICT_CODE"  src="LPUDICT_CODE"  srctype="var" ></Var><Var name="LPU_REG_ID"  put="p1"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="LPU_REG"  put="p2"  src="LPU_REG"  srctype="ctrlcaption" ></Var><Var name="LPU_STATE_BEGIN"  put="p4"  src="LPU_STATE_BEGIN"  srctype="ctrl" ></Var><Var name="LPU_STATE_END"  put="p5"  src="LPU_STATE_END"  srctype="ctrl" ></Var><Var name="AvailableRegPurpose"  put="pAVRP"  src="AvailableRegPurpose"  srctype="var" ></Var><Var name="PmcRegSiteRequired"  put="SiteReq"  src="PmcRegSiteRequired"  srctype="var" ></Var><Var name="hideFERZLButton"  put="hideFERZLButton_p0"  src="hideFERZLButton"  srctype="var" ></Var><Var name="REG_TYPE"  put="reg"  src="REG_TYPE"  srctype="ctrl" ></Var><Var name="LPU_STATE_BEGIN"  put="reg_date"  src="LPU_REG_DATE"  srctype="ctrl" ></Var><Var name="RemoteRegAllow"  put="remreg"  src="RemoteRegAllow"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"   name="GET_LPUDICT" ><Var get="v"  src="LPU"  srctype="session" ></Var><Var name="LPU_ID"  put="v0"  src="LPU_ID"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"   name="GetParamFromOption" ><Var src="LPU"  srctype="session" ></Var><Var name="RESULT"  put="v1"  src="PARAM_FROM_OPTION"  srctype="var" ></Var><Var name="DATE_IN"  get="v2"  src="BEGIN_DATE"  srctype="ctrl" ></Var><Var name="DATE"  put="v3"  src="PARAM_DATE"  srctype="var" ></Var><Var name="PID"  get="v4"  src="PID"  srctype="var" ></Var><Var name="COUNT"  put="v5"  src="PARAM_COUNT"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"   name="GET_REG_LPU" ><Var get="v"  src="LPU"  srctype="session" ></Var><Var name="LPU_ID"  put="v0"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="LPU_CODE"  put="v1"  src="LPU_REG"  srctype="ctrlcaption" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"  mode="post"  name="ADDUPDATE_ACTION" ><Var src="LPU"  srctype="session" ></Var><Var name="pnID"  get="pnID_g0"  src="ID"  srctype="var" ></Var><Var name="pnPID"  get="pnPID_g1"  src="PID"  srctype="var" ></Var><Var name="pnLPU_SITE"  get="pnLPU_SITE_g2"  src="LPU_REG_LPU_SITE"  srctype="ctrl" ></Var><Var name="pdBEGIN_DATE"  get="pdBEGIN_DATE_g3"  src="LPU_STATE_BEGIN"  srctype="ctrl" ></Var><Var name="pdEND_DATE"  get="pdEND_DATE_g4"  src="LPU_STATE_END"  srctype="ctrl" ></Var><Var name="pnLPU_REG"  get="pnLPU_REG_g5"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="pnREGISTER_PURPOSE"  get="pnREGISTER_PURPOSE_g6"  src="REGISTER_PURPOSE"  srctype="ctrl" ></Var><Var name="pnREG_TYPE"  get="pnREG_TYPE_g7"  src="REG_TYPE"  srctype="ctrl" ></Var><Var name="psREG_DOC_NUMB"  get="psREG_DOC_NUMB_g8"  src="REG_DOC_NUMB"  srctype="ctrl" ></Var><Var name="psREG_NOTE"  get="psREG_NOTE_g9"  src="REG_NOTE"  srctype="ctrl" ></Var><Var name="pnREG_CATEGORY"  get="pnREG_CATEGORY_g10"  src="REG_CATEGORY"  srctype="ctrl" ></Var><Var name="pnDIVISION"  get="pnDIVISION_g11"  src="DIVISION"  srctype="ctrl" ></Var><Var name="psEND_REASON"  get="psEND_REASON_g12"  src="END_REASON"  srctype="ctrl" ></Var><Var name="vAPI_VERSION"  get="vAPI_VERSION_g13"  src="4"  srctype="const" ></Var><Var name="action"  get="action_g14"  src="action"  srctype="var" ></Var><Var name="pnD_INSERT_ID"  put="pnD_INSERT_ID_p0"  src="NEW_ID"  srctype="var" ></Var><Var name="psMSG"  put="psMSG_p1"  src="MSG"  srctype="var" ></Var><Var name="pnIS_ERRORS"  put="pnIS_ERRORS_p2"  src="IS_ERRORS"  srctype="var" ></Var></Action><Action  formname="Agents/agent_registration/agent_registration_edit"  mode="post"  name="SelectAction" ><Var src="LPU"  srctype="session" ></Var><Var name="ID"  get="ID_g0"  src="ID"  srctype="var" ></Var><Var name="PID"  put="PID_p0"  src="PID"  srctype="var" ></Var><Var name="PID"  put="PID_p1"  src="PID"  srctype="var" ></Var><Var name="LPU_REG_ID"  put="LPU_REG_ID_p2"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="LPU_REG"  put="LPU_REG_p3"  src="LPU_REG"  srctype="ctrlcaption" ></Var><Var name="LPU_STATE_BEGIN"  put="LPU_STATE_BEGIN_p4"  src="LPU_STATE_BEGIN"  srctype="ctrl" ></Var><Var name="LPU_STATE_END"  put="LPU_STATE_END_p5"  src="LPU_STATE_END"  srctype="ctrl" ></Var><Var name="LPU_SITE_ID"  put="LPU_SITE_ID_p6"  src="LPU_REG_LPU_SITE"  srctype="ctrl" ></Var><Var name="LPU_SITE"  put="LPU_SITE_p7"  src="LPU_REG_LPU_SITE"  srctype="ctrlcaption" ></Var><Var name="REG_TYPE"  put="REG_TYPE_p8"  src="REG_TYPE"  srctype="ctrl" ></Var><Var name="REG_DOC_NUMB"  put="REG_DOC_NUMB_p9"  src="REG_DOC_NUMB"  srctype="ctrl" ></Var><Var name="REG_NOTE"  put="REG_NOTE_p10"  src="REG_NOTE"  srctype="ctrl" ></Var><Var name="REG_CATEGORY_ID"  put="REG_CATEGORY_ID_p11"  src="REG_CATEGORY"  srctype="ctrl" ></Var><Var name="REG_CATEGORY_NAME"  put="REG_CATEGORY_NAME_p12"  src="REG_CATEGORY"  srctype="ctrlcaption" ></Var><Var name="DIVISION_ID"  put="DIVISION_ID_p13"  src="DIVISION"  srctype="ctrl" ></Var><Var name="DIVISION"  put="DIVISION_p14"  src="DIVISION"  srctype="ctrlcaption" ></Var><Var name="REGISTER_PURPOSE_ID"  put="REGISTER_PURPOSE_ID_p15"  src="REGISTER_PURPOSE"  srctype="ctrl" ></Var><Var name="END_REASON"  put="END_REASON_p16"  src="END_REASON"  srctype="ctrl" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="addNumPref" ><Var get="gLPU"  src="LPU"  srctype="session" ></Var><Var name="PID"  get="sPID"  src="PID"  srctype="var" ></Var><Var name="REG_NUMB"  put="pREG_NUMB"  src="REG_NUMB"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="checkLpudictHid" ><Var src="LPU"  srctype="session" ></Var><Var name="LPU_REG"  get="g1"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="IS_LPU"  put="p1"  src="IS_LPU"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="SITE_BY_REG" ><Var name="LPU_SITE_ID"  put="p1"  src="LPU_REG_LPU_SITE"  srctype="ctrl" ></Var><Var name="LPU_SITE"  put="p2"  src="LPU_REG_LPU_SITE"  srctype="ctrlcaption" ></Var><Var name="REG_TYPE"  get="reg"  src="REG_TYPE"  srctype="ctrl" ></Var><Var name="nADDR_ID"  put="p3"  src="ADDR_ID"  srctype="var" ></Var><Var name="AGENT_ID"  get="p4"  put="AGENT_ID_p0"  src="AGENT"  srctype="var" ></Var><Var name="SiteRegPurpose"  get="SiteRegPurpose"  src="SiteRegPurpose"  srctype="var" ></Var><Var name="AgentRegPurpose"  get="AgentRegPurpose"  src="AgentRegPurpose"  srctype="var" ></Var><Var name="REG_PURPOSE"  get="g0"  src="REGISTER_PURPOSE"  srctype="ctrl" ></Var><Var name="LPU_REG"  get="g1"  src="LPU_REG"  srctype="ctrl" ></Var><Var name="DIVISION"  get="division"  src="DIVISION"  srctype="ctrl" ></Var><Var src="LPU"  srctype="session" ></Var><Var name="hide_error_site_by_reg"  get="raise"  src="hide_error_site_by_reg"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="getRegPurpose" ><Var get="g0"  src="LPU"  srctype="session" ></Var><Var name="REG_PURPOSE"  put="p0"  src="REGISTER_PURPOSE_LOC"  srctype="var" ></Var><Var name="AgentRegPurpose"  put="p2"  src="AgentRegPurpose"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="initRegistrationForm" ><Var src="LPU"  srctype="session" ></Var><Var name="CheckRegPurposeAge"  put="p1"  src="CheckRegPurposeAge"  srctype="var" ></Var><Var name="SiteRegPurpose"  put="p2"  src="SiteRegPurpose"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="getSiteOptions" ><Var get="g1"  src="LPU"  srctype="session" ></Var><Var name="SITE_ID"  get="g2"  src="LPU_REG_LPU_SITE"  srctype="ctrl" ></Var><Var name="DIVISION_ID"  put="p1"  src="DIVISION"  srctype="var" ></Var><Var name="DIVISION_NAME"  put="p2"  src="DIVISION_NAME"  srctype="var" ></Var><Var name="REGISTER_PURPOSE"  put="p3"  src="REGISTER_PURPOSE"  srctype="var" ></Var></Action><DataSet name="DS_REGISTER_PURPOSES">
<Var  src="LPU"  srctype="session" ></Var>
<Var  get="g1"  src="AV_RP"  srctype="var" ></Var>
</DataSet>
<DataSet name="DS_REMOVE_REASONS">
<Var  src="LPU"  srctype="session" ></Var>
</DataSet>
<Action  formname="Persmedcard/subforms_fields/registration"   name="getPatFullYears" ><Var name="BIRTHDATE"  get="v0"  src="BIRTHDATE"  srctype="var" ></Var><Var name="LPU_STATE_BEGIN"  get="v1"  src="REG_DATE_BEGIN"  srctype="var" ></Var><Var name="FULL_YEARS"  put="v2"  src="PAT_FULL_YEARS"  srctype="var" ></Var></Action><Action  formname="Persmedcard/subforms_fields/registration"   name="getRegOnkoOptions" ><Var src="LPU"  srctype="session" ></Var><Var name="PMC_ID"  get="PMC_ID_g0"  src="PMC_ID"  srctype="var" ></Var><Var name="MARKER_PRIK_ONKO"  put="MARKER_PRIK_ONKO_p0"  src="MARKER_PRIK_ONKO"  srctype="var" ></Var><Var name="SO_REG_ONKO"  put="SO_REG_ONKO_p1"  src="SO_REG_ONKO"  srctype="var" ></Var></Action><scriptfile>Components/Label/js/Label.1647970476.js</scriptfile>
<cssfile>Components/Label/css/Label.1647970476.css</cssfile>
<cssfile>Components/CheckBox/css/CheckBox.1647970476.css</cssfile>
<scriptfile>Components/CheckBox/js/CheckBox.1740592338.js</scriptfile>
<scriptfile>Components/ButtonEdit/js/ButtonEdit.1740592338.js</scriptfile>
<cssfile>Components/ButtonEdit/css/ButtonEdit.1647970476.css</cssfile>
<scriptfile>Components/UnitEdit/js/UnitEdit.1662400114.js</scriptfile>
<scriptfile>Components/Button/js/Button.1647970476.js</scriptfile>
<cssfile>Components/Button/css/Button.1647970476.css</cssfile>
<scriptfile>Components/ComboBox/js/ComboBox.1747070921.js</scriptfile>
<cssfile>Components/ComboBox/css/ComboBox.1734369720.css</cssfile>
<DataSet name="REG_TYPE_dataset">
<Var  src="LPU"  srctype="session" ></Var>
</DataSet>
<scriptfile>Components/HyperLink/js/HyperLink.1647970476.js</scriptfile>
<scriptfile>Components/Edit/js/Edit.1647970476.js</scriptfile>
<cssfile>Components/Edit/css/Edit.1647970476.css</cssfile>
<DataSet name="REG_CATEGORY_dataset">
<Var  src="LPU"  srctype="session" ></Var>
<Var  src="LPU"  srctype="session" ></Var>
</DataSet>
<scriptfile>Components/DateEdit/js/DateEdit.1760982128.js</scriptfile>
<cssfile>Components/DateEdit/css/DateEdit.1647970476.css</cssfile>
<scriptfile>Components/Mask/js/mask.1785434652.js</scriptfile>
<help url="./wiki/" uid="Form%3DAgents%2Fagent_registration%2Fagent_registration_edit%26modal%3D1"></help></div>
</div>
```