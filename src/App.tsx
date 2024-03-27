import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'left',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.20em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    display: 'flex',
    margin: '0 10px 10px 0 !important'
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  name: 'New Agent Configuration',
  description: '',
  tools: [
    { uid: '11111', description: 'Sends an SMS via Twilio.', api_spec: 'https://google.com', permissions: 'read' }
  ],
  agents: [
    {  name: 'Ad Copy Writer', description: 'Junior add writer', inputs: 'title=1111' },
    {  name: 'Blog Writer (Senior)', description: 'Senor blog  writer', inputs: 'min-length=2222' },
  ],
  data: [
    { uid: '11111', permissions: 'read', description: 'Google Places API' },
    { uid: '22222', permissions: 'write', description: 'Google Weather API' }
  ]
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
  const classes = useStyles();
  let [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const saveData = () => {
    alert('Save Data to a file!')
  }

  const clearData = () => {
    setData({});
  };

  return (
    <Fragment>
      <Grid
        container
        justifyContent={'center'}
        spacing={0}
        className={classes.container}
      >
        <Grid item sm={4}>
          {/* <Typography variant={'h4'} className={classes.title}>
            JSON Data
          </Typography> */}

          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>

          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Reset the Form?
          </Button>

          <Button
            className={classes.resetButton}
            onClick={saveData}
            color='primary'
            variant='contained'
          >
            Save the JSON File
          </Button>

        </Grid>
        <Grid item sm={8}>
          {/* <Typography variant={'h4'} className={classes.title}>
            Rendered form
          </Typography> */}
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
