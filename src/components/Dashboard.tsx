import React, { useState, useEffect, useCallback } from 'react';
import { emailApi, EmailInfo } from '../services/api';
import EmailCard from './EmailCard';
import EmailModal from './EmailModal';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [emails, setEmails] = useState<EmailInfo[]>([]);
    const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [selectedEmail, setSelectedEmail] = useState<EmailInfo | null>(null);
    const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
    const [config, setConfig] = useState<{ sender_list: string[]; project_id: string } | null>(null);
    const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

    // サーバーのヘルスチェック
    const checkServerHealth = useCallback(async () => {
        try {
            await emailApi.healthCheck();
            setServerStatus('connected');
            setError('');
        } catch (err) {
            setServerStatus('disconnected');
            setError('Flask サーバーに接続できません。サーバーが起動しているか確認してください。');
        }
    }, []);

    // 設定を取得
    const fetchConfig = useCallback(async () => {
        try {
            const configData = await emailApi.getConfig();
            setConfig(configData);
        } catch (err) {
            console.error('Failed to fetch config:', err);
        }
    }, []);

    // 監視状態を取得
    const fetchMonitoringStatus = useCallback(async () => {
        try {
            const status = await emailApi.getMonitoringStatus();
            setIsMonitoring(status.is_monitoring);
        } catch (err) {
            console.error('Failed to fetch monitoring status:', err);
        }
    }, []);

    // メールを取得
    const fetchEmails = useCallback(async () => {
        if (serverStatus !== 'connected') return;

        try {
            const response = await emailApi.getLatestEmails();
            setEmails(prevEmails => {
                // 新しいメールを既存のメールと統合（重複を避ける）
                const newEmails = response.emails.filter(
                    newEmail => !prevEmails.some(existing => existing.message_id === newEmail.message_id)
                );
                return [...newEmails, ...prevEmails].slice(0, 50); // 最新50件まで保持
            });
        } catch (err) {
            console.error('Failed to fetch emails:', err);
        }
    }, [serverStatus]);

    // Gmail監視を開始
    const startMonitoring = async () => {
        setLoading(true);
        try {
            const response = await emailApi.startMonitoring();
            setIsMonitoring(true);
            setError('');
            console.log(response.message);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Gmail監視の開始に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    // Gmail監視を停止
    const stopMonitoring = async () => {
        setLoading(true);
        try {
            const response = await emailApi.stopMonitoring();
            setIsMonitoring(false);
            setError('');
            console.log(response.message);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Gmail監視の停止に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    // メールの詳細を表示
    const handleEmailExpand = (email: EmailInfo) => {
        setSelectedEmail(email);
    };

    // モーダルを閉じる
    const handleCloseModal = () => {
        setSelectedEmail(null);
    };

    // 初期化処理
    useEffect(() => {
        checkServerHealth();
    }, [checkServerHealth]);

    // サーバー接続後の処理
    useEffect(() => {
        if (serverStatus === 'connected') {
            fetchConfig();
            fetchMonitoringStatus();
        }
    }, [serverStatus, fetchConfig, fetchMonitoringStatus]);

    // 定期的なメール取得
    useEffect(() => {
        if (isMonitoring && autoRefresh && serverStatus === 'connected') {
            const interval = setInterval(fetchEmails, 3000); // 3秒ごと
            return () => clearInterval(interval);
        }
    }, [isMonitoring, autoRefresh, serverStatus, fetchEmails]);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Gmail Monitor Dashboard</h1>
                <div className={`server-status ${serverStatus}`}>
                    <span className="status-indicator"></span>
                    {serverStatus === 'connected' ? 'サーバー接続中' :
                        serverStatus === 'disconnected' ? 'サーバー未接続' : '接続確認中...'}
                </div>
            </header>

            {error && (
                <div className="alert error">
                    {error}
                    {serverStatus === 'disconnected' && (
                        <button onClick={checkServerHealth} className="retry-btn">
                            再試行
                        </button>
                    )}
                </div>
            )}

            <div className="controls">
                <div className="control-group">
                    <button
                        className={`control-btn ${isMonitoring ? 'stop' : 'start'}`}
                        onClick={isMonitoring ? stopMonitoring : startMonitoring}
                        disabled={loading || serverStatus !== 'connected'}
                    >
                        {loading ? '処理中...' : isMonitoring ? 'Gmail監視を停止' : 'Gmail監視を開始'}
                    </button>

                    <button
                        className="control-btn refresh"
                        onClick={fetchEmails}
                        disabled={serverStatus !== 'connected'}
                    >
                        メールを更新
                    </button>
                </div>

                <div className="control-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                        />
                        自動更新
                    </label>
                </div>
            </div>

            {config && (
                <div className="config-info">
                    <h3>監視設定</h3>
                    <p><strong>プロジェクトID:</strong> {config.project_id}</p>
                    <p><strong>監視対象:</strong> {config.sender_list.join(', ')}</p>
                </div>
            )}

            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{emails.length}</span>
                    <span className="stat-label">受信メール</span>
                </div>
                <div className="stat-item">
                    <span className={`stat-number ${isMonitoring ? 'active' : ''}`}>
                        {isMonitoring ? '監視中' : '停止中'}
                    </span>
                    <span className="stat-label">監視状態</span>
                </div>
            </div>

            <div className="emails-container">
                {emails.length === 0 ? (
                    <div className="no-emails">
                        <p>受信したメールはありません</p>
                        {!isMonitoring && serverStatus === 'connected' && (
                            <p>Gmail監視を開始してメールの受信を待機してください</p>
                        )}
                    </div>
                ) : (
                    emails.map((email, index) => (
                        <EmailCard
                            key={`${email.message_id}-${index}`}
                            email={email}
                            onExpand={handleEmailExpand}
                        />
                    ))
                )}
            </div>

            {selectedEmail && (
                <EmailModal
                    email={selectedEmail}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Dashboard;
