/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ENDPOINTS } from 'utils/URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'components/common/Loading';
import { Button, Col, Row } from 'reactstrap';
import moment from 'moment';
import DonutChart from './DonutChart';

export default function VolunteeringHoursStats(props) {
  const { startDate, endDate } = props;
  const lastWeekStartDate = moment(startDate)
    .subtract(1, 'week')
    .startOf('week')
    .format('YYYY-MM-DD');
  const lastWeekEndDate = moment(endDate)
    .subtract(1, 'week')
    .endOf('week')
    .format('YYYY-MM-DD');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        ENDPOINTS.GET_VOLUNTEER_HOUR_STATS(startDate, endDate, lastWeekStartDate, lastWeekEndDate),
      );
      setData(res.data);
      setLoading(false);
    } catch (_) {
      setError(true);
      setLoading(false);
      toast('Oops! Something went wrong.');
    }
  }, []);

  // we want to fetch the data on page load
  // also whenever the start/end date changes.
  // i.e the user has switched the weeks tab.
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  console.log(data);

  // format data for donut chart
  const donutData = [];
  if (data) {
    for (let i = 0; i < 6; i++) {
      const group = i * 10;
      const groupString = `${group}-${group + 9}`;

      const dataObj = {};
      dataObj.label = `${group} to ${group + 9} hours - ${data.volunteerHoursStats[groupString]}`;
      dataObj.value = data.volunteerHoursStats[groupString];
      donutData.push(dataObj);
    }
    // there is one outlier case in which a volunteer has worked 60+ hours.
    // handle this case after the loop
    donutData.push({
      label: `60+ hours - ${data.volunteerHoursStats['60+']}`,
      value: data.volunteerHoursStats['60+'],
    });
  }

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <Button color="info" onClick={fetchData}>
        Try again
      </Button>
    );
  }

  return (
    <div>
      {startDate}
      <br />
      {endDate}
      <Row>
        <Col>
          {data && (
            <DonutChart data={donutData} width={800} height={400} total={data.numberOfUsers} />
          )}
        </Col>
        <Col>asdf</Col>
      </Row>
    </div>
  );
}