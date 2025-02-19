




export function Form(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
  
    const getValue = () => {
      return element.businessObject.assignee || '';
    };
  
    const setValue = (value) => {
      return modeling.updateProperties(element, {
        form: value,
      });
    };
  
    const [forms, setForms] = useState([]);
  
    useEffect(() => {
      fetchFlowableUsers().then((forms) => {
        setForms(forms.data);
      });
    }, [setForms]);
  
    const getOptions = () => {
      return [
        { label: '<none>', value: undefined },
        ...forms.map((form) => ({
          label: form.name,
          value: form.id,
        })),
      ];
    };
  
    return html` <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Assign a form')}
      label=${translate('Form')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />`;
  }