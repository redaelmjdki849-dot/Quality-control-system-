// Dashboard Component - مكون لوحة التحكم

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Chart from 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">{t('messages.loading')}</div>;
  }

  return (
    <div className="dashboard">
      <h1>{t('navigation.dashboard')}</h1>
      
      {/* Statistics Cards - بطاقات الإحصائيات */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{t('fields.pcsOk')}</h3>
          <p className="stat-value good">{stats.totalOk || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>{t('fields.pcsNok')}</h3>
          <p className="stat-value bad">{stats.totalNok || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>{t('fields.totalStock')}</h3>
          <p className="stat-value">{stats.totalStock || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Quality Rate</h3>
          <p className="stat-value">{stats.qualityRate || 0}%</p>
        </div>
      </div>
      
      {/* Charts - الرسوم البيانية */}
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>OK vs NOK Distribution</h3>
          <canvas id="okNokChart"></canvas>
        </div>
        
        <div className="chart-wrapper">
          <h3>Monthly Trend</h3>
          <canvas id="monthlyChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;